import { decodeToken } from "react-jwt";
import { findOne, login } from "../helpers/apiGateway";
import { Badge, Container } from "react-bootstrap";
import { Login } from "./Login";
import { Admin } from "./Admin";
import { Customer } from "./Customer";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Aside } from "./Aside";

const initialCredentials = {
  username: "",
  password: "",
};

export const Main = () => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      (async () => {
        const u = await findOne(decoded.id);
        if (u.message === "Successfully") {
          setUser(u.data);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }
  }, [msg]);

  useEffect(() => {
    if (user) {
      if (user.isAdmin === true) {
        setProfile("Administradores");
      }
      if (user.isAdmin === false) {
        setProfile("Clientes");
      }
    }
  }, [user]);

  const getUser = (e) => {
    e.preventDefault();
    (async () => {
      if (credentials.username && credentials.password) {
        const res = await login(credentials);
        if (res.message === "Successfully") {
          localStorage.setItem("token", res.token);
          const decoded = decodeToken(res.token);
          const u = await findOne(decoded.id);
          if (u.message === "Successfully") {
            setUser(u.data);
          }
        } else {
          setMsg("Usuario y/o contraseña incorrectos");
        }
      }
    })();
  };

  const logout = () => {
    localStorage.clear();
    setCredentials(initialCredentials);
    setUser(null);
    setProfile(null);
    setMsg("Sesión finalizada");
  };

  return (
    <>
      <Header user={user} profile={profile} logout={logout} />
      <Container className="my-5">
        <h1 className="text-center">
          <Badge bg="success" className="mx-2">
            TEAM7 | Bank
          </Badge>
        </h1>
        {!user && (
          <Login
            credentials={credentials}
            setCredentials={setCredentials}
            getUser={getUser}
            setMsg={setMsg}
          />
        )}
        {profile === "Administradores" && <Admin />}
        {profile === "Clientes" && (
          <Customer accountNumber={user.accountNumber} />
        )}
      </Container>
      <Aside msg={msg} />
    </>
  );
};
