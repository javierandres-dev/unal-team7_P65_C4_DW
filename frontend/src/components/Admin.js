import {
  findAll,
  createOne,
  findOne,
  updateOne,
  deleteOne,
} from "../helpers/apiRequests";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";

const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const Admin = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(initialUser);
  const [id, setId] = useState(null);
  const [cta, setCta] = useState(null);
  const [title, setTitle] = useState(null);
  const [form, setForm] = useState(false);
  const [msgForm, setMsgForm] = useState(null);
  const [question, setQuestion] = useState(false);
  const [validated, setValidated] = useState(false);

  const closeForm = () => setForm(false);
  const showForm = () => setForm(true);

  const closeQuestion = () => setQuestion(false);
  const showQuestion = () => setQuestion(true);

  useEffect(() => {
    getFindAll();
  }, []);

  const getFindAll = async () => {
    const res = await findAll();
    if (!res) return;
    else if (res.message === "Successfully") {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    switch (cta) {
      case "create":
        setUser(initialUser);
        setTitle("Agregar Nuevo Cliente");
        showForm();
        break;
      case "read":
        getCurrentCustomer();
        setTitle("Detalles Cliente");
        showForm();
        break;
      case "update":
        getCurrentCustomer();
        setTitle("Actualizar Datos Cliente");
        showForm();
        break;
      case "delete":
        showQuestion();
        break;
      default:
        break;
    }
  }, [cta]);

  const createCustomer = async (e) => {
    e.preventDefault();
    const fields = e.currentTarget;
    if (fields.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      setMsgForm("Todos los campos son obligatorios");
      return;
    }

    const res = await createOne(user);
    if (res.message === "Successfully") {
      setCta(null);
      setTitle(null);
      closeForm();
      getFindAll();
    }
  };

  const getCurrentCustomer = async () => {
    if (id) {
      const currentCustomer = await findOne(id);
      if (currentCustomer.message === "Successfully") {
        setUser({
          firstName: currentCustomer.data.firstName,
          lastName: currentCustomer.data.lastName,
          email: currentCustomer.data.email,
          password: currentCustomer.data.password,
          isAdmin: currentCustomer.data.isAdmin,
          accountNumber: currentCustomer.data.accountNumber,
        });
      }
    }
  };

  const updateCustomer = async (e) => {
    e.preventDefault();
    const fields = e.currentTarget;
    if (fields.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      setMsgForm("Todos los campos son obligatorios");
      return;
    }
    const res = await updateOne(id, user);
    if (res.message === "Successfully") {
      setId(null);
      setCta(null);
      setTitle(null);
      closeForm();
      getFindAll();
    }
  };

  const deleteCustomer = async () => {
    if (id) {
      const res = await deleteOne(id);
      if (res.message === "Successfully") {
        setId(null);
        setCta(null);
        closeQuestion();
        getFindAll();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        className="my-5"
        onClick={() => {
          setCta("create");
        }}
      >
        Agregar Nuevo Cliente
      </Button>
      <Table responsive>
        <thead className="text-center">
          {users?.length > 0 ? (
            <tr>
              <th>Cliente</th>
              <th>Opciones</th>
            </tr>
          ) : (
            <tr>
              <td colSpan="2"></td>
            </tr>
          )}
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((user) => {
              if (user.isAdmin) {
                return null;
              } else {
                return (
                  <tr key={user.id}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td className="text-center">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => {
                          setId(user.id);
                          setCta("read");
                        }}
                      >
                        Ver más...
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        className="mx-3"
                        onClick={() => {
                          setId(user.id);
                          setCta("update");
                        }}
                      >
                        Actualizar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setId(user.id);
                          setCta("delete");
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
            <tr className="text-center">
              <td colSpan="2">Sin clientes</td>
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
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                required
                readOnly={cta === "read"}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                required
                readOnly={cta === "read"}
              />
            </Form.Group>
            {cta === "read" && (
              <Form.Group className="mb-3" controlId="formBasicAccountNumber">
                <Form.Label>Número de Cuenta</Form.Label>
                <Form.Control type="text" value={user.accountNumber} readOnly />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                readOnly={cta === "read"}
              />
            </Form.Group>
            {cta === "read" ? null : (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}
            {cta === "read" ? null : (
              <Button
                variant="primary"
                type="submit"
                onClick={id ? updateCustomer : createCustomer}
              >
                {id ? "Guardar cambios" : "Agregar"}
              </Button>
            )}
          </Form>
          {msgForm ? (
            <Alert variant="warning" className="my-2">
              {msgForm}
            </Alert>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setCta(null);
              closeForm();
            }}
          >
            {cta === "read" ? "Volver" : "Cancelar"}
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
        <Modal.Body>Esta acción no se puede deshacer</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setCta(null);
              closeQuestion();
            }}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteCustomer}>
            Si, Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
