import { Alert } from "react-bootstrap";

export const Aside = ({ msg }) => {
  return <aside>{msg && <Alert variant="warning" className="text-center">{msg}</Alert>}</aside>;
};
