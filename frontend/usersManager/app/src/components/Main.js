import {
  createOne,
  findAll,
  findOne,
  updateOne,
  deleteOne,
} from "../helpers/apiRequests";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

const initialCustomer = {
  email: "",
  password: "",
};

export const Main = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(initialCustomer);
  const [id, setId] = useState(null);
  const [cta, setCta] = useState(null);
  const [title, setTitle] = useState(null);
  const [form, setForm] = useState(false);
  const [question, setQuestion] = useState(false);

  const closeForm = () => setForm(false);
  const showForm = () => setForm(true);

  const closeQuestion = () => setQuestion(false);
  const showQuestion = () => setQuestion(true);

  useEffect(() => {
    getFindAll();
  }, []);

  useEffect(() => {
    switch (cta) {
      case "create":
        setCustomer(initialCustomer);
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

  const getFindAll = async () => {
    const res = await findAll();
    if (res) {
      setCustomers(res.result);
    }
  };

  const createCustomer = async (e) => {
    e.preventDefault();
    const res = await createOne(customer);
    if (res.result) {
      setCta(null);
      setTitle(null);
      closeForm();
      getFindAll();
    }
  };

  const getCurrentCustomer = async () => {
    if (id) {
      const currentCustomer = await findOne(id);
      if (currentCustomer.result) {
        setCustomer({
          email: currentCustomer.result.username,
          password: currentCustomer.result.password,
        });
      }
    }
  };

  const updateCustomer = async (e) => {
    e.preventDefault();
    const res = await updateOne(id, customer);
    if (res.result) {
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
      if (res.result) {
        setId(null);
        setCta(null);
        closeQuestion();
        getFindAll();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center">
        Clientes
        <Badge bg="success" className="mx-2">
          The Greens Bank
        </Badge>
      </h1>
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
          {customers.length > 0 ? (
            <tr>
              <th>#</th>
              <th>Correo Electrónico</th>
              <th colSpan="3">Opciones</th>
            </tr>
          ) : (
            <tr>
              <td colSpan="5"></td>
            </tr>
          )}
        </thead>
        <tbody>
          {customers && customers.length > 0 ? (
            customers.map((customer, idx) => {
              return (
                <tr key={customer.id}>
                  <td>{idx + 1}</td>
                  <td>{customer.username}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => {
                        setId(customer.id);
                        setCta("read");
                      }}
                    >
                      Ver más...
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setId(customer.id);
                        setCta("update");
                      }}
                    >
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setId(customer.id);
                        setCta("delete");
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan="5">Sin clientes</td>
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={customer.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
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
    </Container>
  );
};
