import { findAccount } from "../helpers/apiGateway";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

export const Customer = ({ user }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const res = await findAccount(user.id);
    setAccount(res.data);
  };

  console.log("user: ", user);
  console.log("account: ", account);

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
              <Card.Link href="#">Transferencias</Card.Link>
              <Card.Link href="#">Historial</Card.Link>
            </Card.Body>
          </Card>
          <Table responsive>
            <thead>
              <tr>
                <th>Historial</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </Table>
        </>
      ) : null}
    </>
  );
};
