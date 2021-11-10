import { Form, Button } from "react-bootstrap";

export const Login = ({ credentials, setCredentials, getWho }) => {
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={getWho}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control type="email" name="username" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="password" onChange={handleChange} />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" type="submit">
          Entrar
        </Button>
        <Button variant="secondary" size="lg" type="button">
          Registrarme
        </Button>
      </div>
    </Form>
  );
};
