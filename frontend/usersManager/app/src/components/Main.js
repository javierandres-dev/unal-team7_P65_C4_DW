import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export const Main = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center">
        Clientes
        <Badge bg="success" className="mx-2">
          The Greens Bank
        </Badge>
      </h1>
      <Button variant="primary" size="lg" className="my-5">
        Agregar Nuevo Cliente
      </Button>
      <Table responsive>
        <thead className="text-center">
          <tr>
            <th>#</th>
            <th>Correo Electrónico</th>
            <th colSpan="2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <Button variant="warning" size="sm">
                Actualizar
              </Button>
            </td>
            <td>
              <Button variant="danger" size="sm">
                Eliminar
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
