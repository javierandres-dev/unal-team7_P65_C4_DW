import { findAll } from "../helpers/apiRequests";
import { Badge, Container } from "react-bootstrap";
import { Login } from "./Login";
import { Admin } from "./Admin";
import { Customer } from "./Customer";
import { useEffect, useState } from "react";

const initialCredentials = {
  username: "",
  password: "",
};

export const Main = () => {
  const [users, setUsers] = useState(null);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [isLogged, setIsLogged] = useState(false);
  const [who, setWho] = useState(null);

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

  const getWho = (e) => {
    e.preventDefault();
    console.log("working...", credentials);
    const res = users.filter((el) => el.email === credentials.username);
    console.log(res);
    if (res.length === 1) {
      if (res[0].isAdmin) {
        setWho("admin");
      } else {
        setWho("customer");
      }
      setIsLogged(true);
    }
  };
  console.log(who);
  return (
    <Container className="my-5">
      <h1 className="text-center">
        <Badge bg="success" className="mx-2">
          The Greens | Bank
        </Badge>
      </h1>
      {!isLogged && (
        <Login
          credentials={credentials}
          setCredentials={setCredentials}
          getWho={getWho}
        />
      )}
      {isLogged && who === "admin" && (
        <Admin users={users} getFindAll={getFindAll} />
      )}
      {isLogged && who === "customer" && <Customer />}
    </Container>
  );
};
