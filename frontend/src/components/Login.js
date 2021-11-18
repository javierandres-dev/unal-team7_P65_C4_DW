import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export const Login = ({ credentials, setCredentials, getAuth, setMsg }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setMsg('Todos los campos son obligatorios');
      e.preventDefault();
      e.stopPropagation();
    } else {
      getAuth(e);
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type='email'
          name='username'
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type='password'
          name='password'
          onChange={handleChange}
          required
        />
      </Form.Group>
      <div className='d-grid gap-2'>
        <Button variant='primary' size='lg' type='submit'>
          Ingresar
        </Button>
      </div>
    </Form>
  );
};
