import { findAccounts, findAccount } from "../helpers/apiGateway";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const initialTransfer = {
  activity: "",
  date: "",
  origin: "",
  destination: "",
  amount: "",
};

const initialForm = {
  destination: "",
  amount: "",
};

export const Customer = ({ user }) => {
  const [account, setAccount] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [transfer, setTransfer] = useState(initialTransfer);
  const [form, setForm] = useState(initialForm);
  const [showTransfer, setShowTransfer] = useState(false);
  const [msgForm, setMsgForm] = useState(null);

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    setTimeout(() => setMsgForm(null), 3000);
  }, [msgForm]);

  const getAccount = async () => {
    const res = await findAccount(user.id);
    setAccount(res.data);
  };

  const closeTranfer = () => setShowTransfer(false);

  const [validated, setValidated] = useState(false);

  const getDestination = async () => {
    const res = await findAccounts();
    const r = res.data.filter((r) => r.id === form.destination);
    if (r.length === 1) {
      if (r[0].id === account.id) {
        setMsgForm(
          "La cuenta de destino debe ser diferente a la cuenta de origen"
        );
      } else {
        setTransfer({
          ...transfer,
          destination: r[0].id,
        });
      }
    } else {
      setMsgForm("La cuenta de destino NO es válida");
    }
  };

  const getAmount = () => {
    if (account.endingBalance - form.amount < 0) {
      setMsgForm("Fondos insuficientes");
    } else {
      setTransfer({
        ...transfer,
        amount: parseInt(form.amount),
      });
    }
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
      setMsgForm("Todos los campos son obligatorios");
      e.stopPropagation();
    } else if (!transfer.destination && !transfer.amount) {
      setMsgForm("Corregir cuenta de destino y valor a trasferir");
    } else if (!transfer.destination) {
      setMsgForm("Cuenta de destino por corregir");
    } else if (!transfer.amount) {
      setMsgForm("Valor a transferir por corregir");
    } else {
      const date = new Date();
      setTransfer({
        ...transfer,
        activity: "Tranferencia",
        date: date.toString(),
        origin: account.id,
      });
    }
    setValidated(true);
  };

console.log("transfer: ", transfer);

  return (
    <>
      {account ? (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                Titular: {user.firstName} {user.lastName}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Cuenta Nº: {account.accountNumber}
              </Card.Subtitle>
              <Card.Text>Saldo actual: ${account.endingBalance}</Card.Text>
              <Button variant="link" onClick={() => setShowTransfer(true)}>
                Transferencias
              </Button>
              <Button
                variant="link"
                onClick={() => setShowHistory(!showHistory)}
              >
                Historial
              </Button>
            </Card.Body>
          </Card>
          {showHistory && (
            <Table responsive className="mt-3">
              <caption>Historial</caption>
              <thead className="text-center">
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
                  return (
                    <tr key={idx}>
                      <td>{activity.date?.slice(3, 24)}</td>
                      <td>{activity.activity}</td>
                      <td>{activity.origin}</td>
                      <td>{activity.destination}</td>
                      <td>$ {activity.amount}</td>
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
                      type="text"
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      onBlur={() => {
                        getDestination();
                      }}
                      required
                      placeholder="Cuenta de destino Nº"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      onBlur={() => getAmount()}
                      required
                      placeholder="Valor a transferir $"
                    />
                  </Col>
                </Row>
                <Button type="submit" variant="primary" className="mt-3">
                  Transferir
                </Button>
                {msgForm ? (
                  <Alert variant="warning" className="my-2">
                    {msgForm}
                  </Alert>
                ) : null}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeTranfer}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
    </>
  );
};
