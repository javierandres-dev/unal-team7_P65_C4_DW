import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const Header = ({ user, profile, logout }) => {
  return (
    <Container fluid className="bg-dark text-light pt-2">
      {!user && <p className="pb-2">¡Bienvenido!</p>}
      {user && (
        <div className="d-flex justify-content-between">
          <p>
            <span>Hola, </span>
            {user.firstName} {user.lastName}!
          </p>
          <div className="text-end">
            <div className="text-warning">Portal {profile}</div>
            <Button variant="link" onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};
