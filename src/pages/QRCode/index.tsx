import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { MainContainer } from "./styles";
import Footer from "../../components/Footer";
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { MdDoneAll } from "react-icons/md";
import { api } from "../../services/api";
import ReactLoading from "react-loading";

interface IStateProps {
  cpf: string;
  invoiceNumber: string;
  qrCodeValue: string;
  totalPix: number;
  shippingOrder: number;
  customerName: string;
  customerCNPJ: string;
  STATUSPIX: string;
  TXID: string;
}

export const QRCodePage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    cpf,
    invoiceNumber,
    qrCodeValue,
    shippingOrder,
    totalPix,
    customerCNPJ,
    customerName,
    STATUSPIX,
    TXID,
  } = location?.state as IStateProps;

  const [statusPixLocal, setStatusPixLocal] = useState(STATUSPIX);

  const handleBack = () => {
    navigate("/invoices", {
      state: {
        cpf,
        shippingOrder,
      },
    });
  };

  useEffect(() => {
    if (statusPixLocal === "ATIVA") {
      setLoading(true);
      api.get(`pix?txid=${TXID}`).then((response) => {
        // console.log(response);
        if (response?.data?.status === "CONCLUIDA") {
          setStatusPixLocal(response?.data?.status);
        }
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPixLocal]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "5",
        height: "100%",
      }}
    >
      <Header
        label={`Nota Fiscal ${invoiceNumber} - ${new Date().toLocaleDateString()}`}
      />
      <MainContainer>
        <div
          style={{
            display: "flex",
            flexGrow: "3",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex", justifyContent: "center" }}>
            SEMALO INDUSTRIA E COMERCIO DE ALIMENTOS LTDA
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            36.804.268/0001-23
          </span>
        </div>
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactLoading
              type={"cylon"}
              color={"#ff8000"}
              height={"150px"}
              width={"150px"}
            />
          </div>
        )}
        {!loading && (
          <div
            style={{
              height: "95%",
              width: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {statusPixLocal === "CONCLUIDA" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "2rem" }}>Recebido</span>
                <span>
                  <MdDoneAll size={46} color={"green"}></MdDoneAll>
                </span>
              </div>
            ) : (
              <QRCode
                size={256}
                style={{
                  height: "95%",
                  width: "auto",
                  maxWidth: "98%",
                  padding: "16px",
                }}
                value={qrCodeValue}
                viewBox={`0 0 256 256`}
              />
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexGrow: "3",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex", justifyContent: "center" }}>
            {customerName}
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            {customerCNPJ}
          </span>
        </div>
      </MainContainer>
      <Footer>
        <div style={{ fontSize: "1.5rem" }}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalPix)}
        </div>
        <div>
          <Button variant="warning" onClick={handleBack}>
            Voltar
          </Button>
        </div>
      </Footer>
    </div>
  );
};
