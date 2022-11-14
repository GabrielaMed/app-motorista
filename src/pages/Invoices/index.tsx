import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import {
  MdAssignment,
  MdQrCode2,
  MdCameraAlt,
  MdLogout,
  MdDoneAll,
} from "react-icons/md";
import { DefaultPalettColors } from "../../assets/colors";
import { ListContainer, ListItem, MainContainer } from "./styles";
import Footer from "../../components/Footer";
import { Button, Form } from "react-bootstrap";
import ReactLoading from "react-loading";
import { ToastMessage } from "../../components/Toast";
import { IToastProps, IToastType } from "../../Shared/Interfaces";

interface IStateProps {
  cpf: string;
  shippingOrder: string;
}

interface IInvoice {
  NUNOTA: number;
  NOMEPARC: string;
  NUMNOTA: number;
  VALORPIX: number;
  selected: boolean;
  CODPARC: number;
  CNPJPARC: string;
  STATUSPIX?: string;
  QRCODE?: string;
  TXID?: string;
}

export const Invoices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cpf, shippingOrder } = location?.state as IStateProps;
  const [loading, setLoading] = useState(false);
  const [invoicesData, setInvoicesData] = useState([] as IInvoice[]);
  const [searchText, setSearchText] = useState("");
  const [toast, setToast] = useState<IToastProps>({
    toastMessage: "",
    toastMessageType: IToastType.unknow,
    show: false,
  });

  const dataFiltered =
    searchText === ""
      ? invoicesData
      : invoicesData.filter((invoice) =>
          invoice.NOMEPARC.toString().includes(searchText.toUpperCase())
        );

  const totalPix = invoicesData.reduce((prev, invoice) => {
    return invoice.selected ? prev + invoice.VALORPIX : prev;
  }, 0);

  const getData = async () => {
    setLoading(true);
    const response = await api.get(
      `shippingOrder?CPFMOTORISTA=${cpf}&ORDEMCARGA=${shippingOrder}`
    );

    setLoading(false);
    if (response?.data) {
      setInvoicesData(response?.data);
    }
  };

  const getAdditionalInformations = () => {
    const selectedInvoices = invoicesData.filter((invoice) => invoice.selected);
    if (!selectedInvoices) return [];
    return selectedInvoices.map((invoice) => ({
      nome: "Nota Fiscal",
      valor: invoice.NUMNOTA,
    }));
  };

  const handleQRCode = async () => {
    try {
      if (!(totalPix > 0)) {
        throw new Error("Nenhuma nota foi selecionada!");
      }

      setLoading(true);

      const invoicesNumberSelecteds = invoicesData
        .filter((invoice) => invoice.selected)
        .map((invoice) => invoice.NUNOTA)
        .toString();

      const defaultCustomerPix = invoicesData.filter(
        (invoice) => invoice.selected
      )[0];

      const pixData = {
        codParc: defaultCustomerPix.CODPARC,
        nuNota: invoicesNumberSelecteds,
        shippingOrderNumber: shippingOrder,
        devedor: {
          cpf: defaultCustomerPix.CNPJPARC.toString().trim(),
          nome: defaultCustomerPix.NOMEPARC,
        },
        valor: {
          original: totalPix.toFixed(2),
        },
        solicitacaoPagador: "Cobrança referente a venda de produtos",
        infoAdicionais: getAdditionalInformations(),
      };

      let QRCODE = defaultCustomerPix?.QRCODE;

      if (!defaultCustomerPix.STATUSPIX) {
        const response = await api.post("pix", pixData);
        if (response?.data) {
          QRCODE = response?.data?.textoImagemQRcode;
        }
      }

      if (!QRCODE) throw new Error("Erro ao carregar QRCODE");

      setLoading(false);

      navigate("/qrcode", {
        state: {
          cpf,
          invoiceNumber: invoicesNumberSelecteds,
          shippingOrder,
          qrCodeValue: QRCODE,
          TXID: defaultCustomerPix?.TXID,
          totalPix,
          STATUSPIX: defaultCustomerPix.STATUSPIX,
          customerName: defaultCustomerPix.NOMEPARC,
          customerCNPJ: defaultCustomerPix.CNPJPARC,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          show: true,
          toastMessage: "Nenhuma nota selecionada!",
          toastMessageType: IToastType.error,
        });
        console.log(error.message);
      }
    }
  };

  const handlePhoto = async () => {
    try {
      if (!(totalPix > 0)) {
        throw new Error("Nenhuma nota foi selecionada!");
      }
      navigate("/takePhoto", {
        state: {
          nunota: getAdditionalInformations()[0]["valor"],
        },
      });
      //console.log(getAdditionalInformations()[0]['valor']);
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          show: true,
          toastMessage: "Nenhuma nota selecionada!",
          toastMessageType: IToastType.error,
        });
        console.log(error.message);
      }
    }
  };

  const selectInvoice = async (invoice: IInvoice) => {
    const invoices = invoicesData.map((item) => {
      return item.NUNOTA === invoice.NUNOTA
        ? { ...item, selected: true }
        : { ...item, selected: false };
    });
    setInvoicesData([...invoices]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        flex: "5",
        height: "100vh",
      }}
    >
      <Header
        icon={
          <MdAssignment color={DefaultPalettColors.invoice.orange} size={24} />
        }
        label={`Ordem de Carga ${shippingOrder}`}
      />

      {/* <div style={{ height: "auto", margin: "auto" }}>teste</div> */}

      <MainContainer>
        <ToastMessage setToast={setToast} toast={toast} />
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
          <ListContainer>
            <ListItem selected={false} key={-1}>
              <Form.Control
                placeholder="Digite o nome do cliente"
                onChange={(e) => setSearchText(e.target.value)}
              ></Form.Control>
            </ListItem>
            {dataFiltered.length > 0 &&
              dataFiltered.map((invoice, idx) => (
                <ListItem
                  key={idx}
                  selected={invoice?.selected}
                  onClick={() => selectInvoice(invoice)}
                >
                  <div>
                    <span>
                      Cliente:
                      <span style={{ fontWeight: "600", marginLeft: "0.5rem" }}>
                        {invoice.NOMEPARC}
                      </span>
                    </span>
                    <span>
                      Nota:
                      <span style={{ marginLeft: "0.5rem" }}>
                        {invoice.NUMNOTA}
                      </span>
                    </span>
                    <span>
                      Valor:
                      <span style={{ fontWeight: "600", marginLeft: "0.5rem" }}>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(invoice.VALORPIX)}
                      </span>
                    </span>
                  </div>
                  <div>
                    {invoice?.STATUSPIX === "ATIVA" && (
                      <MdQrCode2 size={24} color={"black"} />
                    )}
                    {invoice?.STATUSPIX === "CONCLUIDA" && (
                      <MdDoneAll size={24} color={"green"} />
                    )}
                  </div>
                </ListItem>
              ))}
          </ListContainer>
        )}
      </MainContainer>
      <Footer>
        <div style={{ fontSize: "1.5rem" }}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalPix)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "75%",
            maxWidth: "200px",
          }}
        >
          <Button
            variant="warning"
            onClick={handlePhoto}
            style={{ cursor: "pointer", width: "3rem" }}
            
          >
            <MdCameraAlt size={16} color={"black"} />
          </Button>
          <Button
            variant="warning"
            onClick={handleQRCode}
            style={{ cursor: "pointer", width: "3rem" }}
          >
            <MdQrCode2 size={16} color={"black"} />
          </Button>
          <Button
            variant="warning"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", width: "3rem" }}
          >
            <MdLogout size={16} color={"black"} />
          </Button>
        </div>
      </Footer>
    </div>
  );
};
