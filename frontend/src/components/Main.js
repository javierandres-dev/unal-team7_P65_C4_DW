import { decodeToken } from "react-jwt";
import { findAuth, login } from "../helpers/apiGateway";
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
  const [auth, setAuth] = useState(null);
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      (async () => {
        const u = await findAuth(decoded.id);
        if (u.message === "Successfully") {
          setAuth(u.data);
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
    if (auth) {
      if (auth.isAdmin === true) {
        setProfile("Administradores");
      }
      if (auth.isAdmin === false) {
        setProfile("Clientes");
      }
    }
  }, [auth]);

  const getAuth = (e) => {
    e.preventDefault();
    (async () => {
      if (credentials.username && credentials.password) {
        const res = await login(credentials);
        if (res.message === "Successfully") {
          localStorage.setItem("token", res.token);
          const decoded = decodeToken(res.token);
          const u = await findAuth(decoded.id);
          if (u.message === "Successfully") {
            setAuth(u.data);
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
    setAuth(null);
    setProfile(null);
    setMsg("Sesión finalizada");
  };

  return (
    <>
      <Header auth={auth} profile={profile} logout={logout} />
      <Container className="my-5">
        <h1 className="text-center">
          <Badge bg="success" className="mx-2">
            TEAM7 | Bank
          </Badge>
        </h1>
        {!auth && (
          <Login
            credentials={credentials}
            setCredentials={setCredentials}
            getAuth={getAuth}
            setMsg={setMsg}
          />
        )}
        {profile === "Administradores" && <Admin setMsg={setMsg} />}
        {profile === "Clientes" && <Customer setMsg={setMsg} auth={auth} />}
      </Container>
      <Aside msg={msg} />
    </>
  );
};
