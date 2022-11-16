import React, { FormEvent, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineReceipt } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PatternFormat } from "react-number-format";

import { Container, Logo } from "./styles";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState(
    localStorage.getItem("app.motorista.cpf") || ""
  );
  const [shippingOrder, setShippingOrder] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    localStorage.setItem("app.motorista.cpf", cpf);
    event.preventDefault();
    navigate("/invoices", {
      state: {
        cpf: cpf.replaceAll(".", "").replaceAll("-", ""),
        shippingOrder,
      },
    });
  };

  return (
    <Container>
      <div>
        <span style={{ color: "white" }}>Versão 1.0.2</span>
      </div>
      <Logo>
        <MdOutlineReceipt color="#FB8500" size={90} />
      </Logo>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{ marginBottom: "1rem", display:"flex", flexDirection:"column" }}>
          <Form.Label style={{ color: "white" }}>Usuário</Form.Label>
          <PatternFormat
            type="text"
            placeholder="CPF"
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
            name="cpf"
            format="##############"
            className={"form-control"}
          />
          <Form.Label style={{ color: "white", marginTop: "1rem" }}>
            Ordem de Carga
          </Form.Label>
          <PatternFormat
            type="text"
            placeholder="Ordem de Carga"
            onChange={(e) => setShippingOrder(e.target.value)}
            value={shippingOrder}
            name="shippingOrder" 
            format={"##########"}  
            className={"form-control"}        
            />
        </Form.Group>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
