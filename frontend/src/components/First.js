import { createFirst } from '../helpers/apiGateway';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';

const initialObj = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: true,
};

export const First = () => {
  const [obj, setObj] = useState(initialObj);
  const [validated, setValidated] = useState(false);
  const [msgForm, setMsgForm] = useState(null);

  useEffect(() => {
    setTimeout(() => setMsgForm(null), 3000);
  }, [msgForm]);

  const createAdmin = async (e) => {
    const res = await createFirst(obj);
    if (res.message === 'Successfully') {
      setMsgForm('Agregado satisfactoriamente');
      setObj(initialObj);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObj({
      ...obj,
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
      createAdmin();
    }
    setValidated(true);
  };

  return (
    <Container className='py-5'>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Control
          type='text'
          name='firstName'
          value={obj.firstName}
          onChange={handleChange}
          required
          placeholder='Nombre...'
          className='mb-3'
        />
        <Form.Control
          type='text'
          name='lastName'
          value={obj.lastName}
          onChange={handleChange}
          required
          placeholder='Apellido...'
          className='mb-3'
        />
        <Form.Control
          type='email'
          name='email'
          value={obj.email}
          onChange={handleChange}
          required
          placeholder='Correo Electrónico...'
          className='mb-3'
        />
        <Form.Control
          type='password'
          name='password'
          value={obj.password}
          onChange={handleChange}
          required
          placeholder='Contraseña...'
          className='mb-3'
        />
        <div className='d-grid gap-2'>
          <Button variant='outline-primary' type='submit' size='lg'>
            Agregar Administrador
          </Button>
        </div>
        {msgForm ? (
          <Alert variant='warning' className='my-2'>
            {msgForm}
          </Alert>
        ) : null}
      </Form>
    </Container>
  );
};
