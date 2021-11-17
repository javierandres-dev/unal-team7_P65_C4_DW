import { decodeToken } from "react-jwt";
import { Badge, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findAuth, login } from "../helpers/apiGateway";
import { Header } from "./Header";
import { Aside } from "./Aside";
import { Login } from "./Login";
import { Admin } from "./Admin";
import { Customer } from "./Customer";

const initialCredentials = {
  username: "",
  password: "",
};

export const Main = () => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [token, setToken] = useState(null);
  const [auth, setAuth] = useState(null);
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      (async () => {
        const u = await findAuth(decoded.id);
        if (u.message === "Successfully") setAuth(u.data);
      })();
    }
  }, [token]);

  useEffect(() => {
    if (auth) {
      if (auth.isAdmin === true) setProfile("Administradores");
      if (auth.isAdmin === false) setProfile("Clientes");
    }
  }, [auth]);

  useEffect(() => {
    if (msg) setTimeout(() => setMsg(null), 3000);
  }, [msg]);

  const getAuth = (e) => {
    e.preventDefault();
    (async () => {
      if (credentials.username && credentials.password) {
        const res = await login(credentials);
        if (res.message === "Successfully") {
          setToken(res.token);
          localStorage.setItem("token", res.token);
        } else {
          setMsg("Usuario y/o contraseña incorrectos");
        }
      }
    })();
  };

  const logout = () => {
    localStorage.clear();
    setCredentials(initialCredentials);
    setToken(null);
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
        {profile === "Administradores" && (
          <Admin token={token} setMsg={setMsg} />
        )}
        {profile === "Clientes" && (
          <Customer token={token} auth={auth} setMsg={setMsg} />
        )}
      </Container>
      <Aside msg={msg} />
    </>
  );
};
