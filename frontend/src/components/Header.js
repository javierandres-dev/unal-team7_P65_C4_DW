import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export const Header = ({ auth, profile, logout }) => {
  return (
    <Container fluid className='bg-dark text-light pt-2 px-5'>
      {!auth && <p className='pb-2'>¡Bienvenido!</p>}
      {auth && (
        <div className='d-flex justify-content-between'>
          <p>
            <span>Hola, </span>
            {auth.firstName} {auth.lastName}!
          </p>
          <div className='text-end'>
            <div className='text-warning'>Portal {profile}</div>
            <Button variant='link' onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};
