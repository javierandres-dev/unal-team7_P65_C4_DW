import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import {
  findAuths,
  createAuth,
  findAuth,
  updateAuth,
  deleteAuth,
  createAccount,
  findAccount,
  deleteAccount,
} from '../helpers/apiGateway';

const initialAuth = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  initialDeposit: '',
};

export const Admin = ({ token, setMsg }) => {
  const [auths, setAuths] = useState(null);
  const [auth, setAuth] = useState(initialAuth);
  const [id, setId] = useState(null);
  const [cta, setCta] = useState(null);
  const [title, setTitle] = useState(null);
  const [form, setForm] = useState(false);
  const [msgForm, setMsgForm] = useState(null);
  const [question, setQuestion] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getAuths();
  }, []);

  useEffect(() => {
    setTimeout(() => setMsgForm(null), 3000);
  }, [msgForm]);

  useEffect(() => {
    switch (cta) {
      case 'create':
        setAuth(initialAuth);
        setTitle('Agregar Nuevo Cliente');
        showForm();
        break;
      case 'read':
        getCurrentCustomer();
        setTitle('Detalles Cliente');
        showForm();
        break;
      case 'update':
        getCurrentCustomer();
        setTitle('Actualizar Datos Cliente');
        showForm();
        break;
      case 'delete':
        getCurrentCustomer();
        showQuestion();
        break;
      default:
        break;
    }
  }, [cta]);

  const closeForm = () => setForm(false);
  const showForm = () => setForm(true);

  const closeQuestion = () => setQuestion(false);
  const showQuestion = () => setQuestion(true);

  const getAuths = async () => {
    const res = await findAuths(token);
    if (!res) return;
    else if (res.message === 'Successfully') setAuths(res.data);
  };

  const createCustomer = async (e) => {
    const res = await createAuth(auth, token);
    if (res.message === 'Successfully') {
      const r = await createAccount(
        {
          userId: res.data.id,
          id: res.data.accountId,
          activities: [
            {
              activity: 'Apertura de cuenta',
              date: res.data.startDate,
              origin: 'Depósito inicial',
              destination: 'Depósito inicial',
              amount: res.data.initialDeposit,
            },
          ],
          endingBalance: res.data.initialDeposit,
        },
        token
      );
      if (r.message === 'Successfully') {
        setMsg('Cuenta creada satisfactoriamente');
      }
      setCta(null);
      setTitle(null);
      closeForm();
      getAuths();
    }
  };

  const getCurrentCustomer = async () => {
    if (id) {
      const currentCustomer = await findAuth(id, token);
      if (currentCustomer.message === 'Successfully')
        setAuth(currentCustomer.data);
    }
  };

  const updateCustomer = async (e) => {
    const res = await updateAuth(id, auth, token);
    if (res.message === 'Successfully') {
      setId(null);
      setCta(null);
      setTitle(null);
      closeForm();
      getAuths();
    }
  };

  const deleteCustomer = async () => {
    if (id) {
      const accountCustomer = await findAccount(id, token);
      if (accountCustomer.data.endingBalance === 0) {
        const resp = await deleteAccount(id, token);
        if (resp.message === 'Successfully') {
          const res = await deleteAuth(id, token);
          if (res.message === 'Successfully') {
            closeQuestion();
            getAuths();
            setMsg('Eliminado');
          }
        }
      } else {
        closeQuestion();
        setMsg('No se puede eliminar cliente, tiene saldo en cuenta');
      }
      setId(null);
      setCta(null);
    }
  };

  const checkAmount = () => {
    if (auth.initialDeposit < 1) {
      setAuth({
        ...auth,
        initialDeposit: '',
      });
      setMsgForm('Depósito inicial deber mayor a cero');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (f.checkValidity() === false) {
      setMsgForm('Todos los campos son obligatorios');
      e.stopPropagation();
    } else {
      id ? updateCustomer() : createCustomer();
    }
    setValidated(true);
  };

  return (
    <>
      <Button
        variant='primary'
        size='lg'
        className='my-5'
        onClick={() => {
          setCta('create');
        }}
      >
        Agregar Nuevo Cliente
      </Button>
      <Table responsive>
        <thead className='text-center'>
          {auths?.length > 1 ? (
            <tr>
              <th>Cliente</th>
              <th>Opciones</th>
            </tr>
          ) : (
            <tr>
              <td colSpan='2'>No existen clientes</td>
            </tr>
          )}
        </thead>
        <tbody>
          {auths?.length > 1 ? (
            auths.map((user) => {
              if (user.isAdmin) {
                return null;
              } else {
                return (
                  <tr key={user.id}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td className='text-center'>
                      <Button
                        variant='info'
                        size='sm'
                        onClick={() => {
                          setId(user.id);
                          setCta('read');
                        }}
                      >
                        Ver más...
                      </Button>
                      <Button
                        variant='warning'
                        size='sm'
                        className='mx-3'
                        onClick={() => {
                          setId(user.id);
                          setCta('update');
                        }}
                      >
                        Actualizar
                      </Button>
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() => {
                          setId(user.id);
                          setCta('delete');
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                );
              }
            })
          ) : (
            <tr className='text-center'>
              <td colSpan='2'>Agregue nuevo cliente</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal
        show={form}
        onHide={() => {
          setCta(null);
          closeForm();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicFirstName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                value={auth.firstName}
                onChange={handleChange}
                required
                readOnly={cta === 'read'}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicLastName'>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                value={auth.lastName}
                onChange={handleChange}
                required
                readOnly={cta === 'read'}
              />
            </Form.Group>
            {cta === 'read' && (
              <>
                <Form.Group className='mb-3' controlId='formBasicAccountNumber'>
                  <Form.Label>Número de Cuenta</Form.Label>
                  <Form.Control type='text' value={auth.accountId} readOnly />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicAccountDate'>
                  <Form.Label>Fecha de apertura de cuenta</Form.Label>
                  <Form.Control
                    type='text'
                    value={auth.startDate?.slice(3, 24)}
                    readOnly
                  />
                </Form.Group>
              </>
            )}
            {cta !== 'update' && (
              <Form.Group className='mb-3' controlId='formBasicDeposit'>
                <Form.Label>Depósito Inicial</Form.Label>
                <Form.Control
                  type='number'
                  name='initialDeposit'
                  value={auth.initialDeposit}
                  onChange={handleChange}
                  onBlur={checkAmount}
                  required
                  readOnly={cta === 'read'}
                />
              </Form.Group>
            )}
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={auth.email}
                onChange={handleChange}
                required
                readOnly={cta === 'read'}
              />
            </Form.Group>
            {cta === 'read' ? null : (
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  value={auth.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}
            {cta === 'read' ? null : (
              <Button variant='primary' type='submit'>
                {id ? 'Guardar cambios' : 'Agregar'}
              </Button>
            )}
          </Form>
          {msgForm ? (
            <Alert variant='warning' className='my-2'>
              {msgForm}
            </Alert>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              setCta(null);
              closeForm();
            }}
          >
            {cta === 'read' ? 'Volver' : 'Cancelar'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={question}
        onHide={() => {
          setCta(null);
          closeQuestion();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>¿Eliminar cliente?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esta acción no se puede deshacer</p>
          <small>La cuenta del cliente debe tener saldo en cero (0)</small>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              setCta(null);
              closeQuestion();
            }}
          >
            Cancelar
          </Button>
          <Button variant='danger' onClick={deleteCustomer}>
            Si, Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
