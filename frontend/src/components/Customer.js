import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import {
  findAccounts,
  findAccount,
  updateAccount,
} from '../helpers/apiGateway';

const initialTransfer = {
  activity: '',
  date: '',
  origin: '',
  destination: '',
  amount: '',
};

const initialForm = {
  destination: '',
  amount: '',
};

export const Customer = ({ token, auth, setMsg }) => {
  const [account, setAccount] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [transfer, setTransfer] = useState(initialTransfer);
  const [form, setForm] = useState(initialForm);
  const [showTransfer, setShowTransfer] = useState(false);
  const [msgForm, setMsgForm] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (account) setOrigin(account);
  }, [account]);

  useEffect(() => {
    setTimeout(() => setMsgForm(null), 3000);
  }, [msgForm]);

  useEffect(() => {
    if (transfer.activity === 'Transferencia') wireTransfer();
  }, [transfer]);

  const closeTranfer = () => setShowTransfer(false);

  const getAccount = async () => {
    const res = await findAccount(auth.id, token);
    setAccount(res.data);
  };

  const getDestination = async () => {
    const res = await findAccounts(token);
    const r = res.data.filter((r) => r.id === form.destination);
    if (r.length === 1) {
      if (r[0].id === account.id) {
        setMsgForm(
          'La cuenta de destino debe ser diferente a la cuenta de origen'
        );
      } else {
        setDestination(r[0]);
        setTransfer({
          ...transfer,
          destination: r[0].id,
        });
      }
    } else {
      setMsgForm('La cuenta de destino NO es válida');
    }
  };

  const getAmount = () => {
    if (form.amount < 1)
      setMsgForm('El valor a transferir debe ser mayor a cero');
    else if (account.endingBalance - form.amount < 0)
      setMsgForm('Fondos insuficientes');
    else {
      setTransfer({
        ...transfer,
        amount: parseInt(form.amount),
      });
    }
  };

  const wireTransfer = async () => {
    closeTranfer();

    const o = origin;
    o.endingBalance = origin.endingBalance - transfer.amount;
    o.activities.push(transfer);
    const upOrigin = await updateAccount(transfer.origin, o, token);

    const d = destination;
    d.endingBalance = destination.endingBalance + transfer.amount;
    d.activities.push(transfer);
    const upDestination = await updateAccount(transfer.destination, d, token);

    Promise.all([upOrigin, upDestination]).then((res) => {
      if (
        res[0].message === 'Successfully' &&
        res[1].message === 'Successfully'
      ) {
        setMsg('Transferencia realizada con éxito');
      } else {
        setMsg('Ocurrión un error en la transferencia');
      }
      setTransfer(initialTransfer);
      setForm(initialForm);
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (f.checkValidity() === false) {
      setMsgForm('Todos los campos son obligatorios');
      e.stopPropagation();
    } else if (!transfer.destination && !transfer.amount) {
      setMsgForm('Corregir cuenta de destino y valor a trasferir');
      e.stopPropagation();
    } else if (!transfer.destination) {
      setMsgForm('Cuenta de destino por corregir');
      e.stopPropagation();
    } else if (!transfer.amount) {
      setMsgForm('Valor a transferir por corregir');
      e.stopPropagation();
    } else {
      const date = new Date();
      setTransfer({
        ...transfer,
        date: date.toString(),
        origin: account.id,
        activity: 'Transferencia',
      });
    }
    setValidated(true);
  };

  return (
    <>
      {account ? (
        <>
          <Card style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>
                Titular: {auth.firstName} {auth.lastName}
              </Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Cuenta Nº: {account.id}
              </Card.Subtitle>
              <Card.Text>
                Saldo actual:{' '}
                <strong
                  className={
                    account.endingBalance === auth.initialDeposit
                      ? 'text-success'
                      : account.endingBalance > 0
                      ? 'text-primary'
                      : 'text-danger'
                  }
                >
                  ${account.endingBalance}
                </strong>
              </Card.Text>
              <Button variant='link' onClick={() => setShowTransfer(true)}>
                Transferencias
              </Button>
              <Button
                variant='link'
                onClick={() => setShowHistory(!showHistory)}
              >
                Historial
              </Button>
            </Card.Body>
          </Card>
          {showHistory && (
            <Table responsive className='mt-3'>
              <caption>Historial</caption>
              <thead className='text-center'>
                <tr>
                  <th>Fecha, Hora</th>
                  <th>Actividad</th>
                  <th>Cuenta de origen</th>
                  <th>Cuenta de destino</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {account.activities?.map((activity, idx) => {
                  let rowColor,
                    op = '';
                  activity.origin === 'Depósito inicial'
                    ? (rowColor = 'text-success')
                    : activity.destination === auth.accountId
                    ? (rowColor = 'text-primary')
                    : (rowColor = 'text-danger');
                  if (rowColor === 'text-primary') op = '+';
                  if (rowColor === 'text-danger') op = '-';
                  return (
                    <tr key={idx} className={rowColor}>
                      <td>{activity.date?.slice(3, 24)}</td>
                      <td>{activity.activity}</td>
                      <td>{activity.origin}</td>
                      <td>{activity.destination}</td>
                      <td>
                        {op} $ {activity.amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
          <Modal show={showTransfer} onHide={closeTranfer}>
            <Modal.Header closeButton>
              <Modal.Title>Transferir dinero a otra cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleTransfer}>
                <Row>
                  <Col>
                    <Form.Control
                      type='text'
                      name='destination'
                      value={form.destination}
                      onChange={handleChange}
                      onBlur={() => {
                        getDestination();
                      }}
                      required
                      placeholder='Cuenta de destino Nº'
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='number'
                      name='amount'
                      value={form.amount}
                      onChange={handleChange}
                      onBlur={() => getAmount()}
                      required
                      placeholder='Valor a transferir $'
                    />
                  </Col>
                </Row>
                <Button type='submit' variant='primary' className='mt-3'>
                  Transferir
                </Button>
                {msgForm ? (
                  <Alert variant='warning' className='my-2'>
                    {msgForm}
                  </Alert>
                ) : null}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={closeTranfer}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
    </>
  );
};
