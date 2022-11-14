import { Container, HeaderLogo, HeaderTitle } from "./styles";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface props {
  icon?: any;
  label: string;
}

export const Header = ({ icon, label }: props) => {
  const navigate = useNavigate();
  const logoff = () => {
    localStorage.removeItem("app.motorista.cpf");

    navigate("/");
  };

  return (
    <Container>
      <header>
        <HeaderLogo>
          <img src="logo.png" alt="logo" />
        </HeaderLogo>
        <HeaderTitle>
          {/* <div>{icon}</div> */}
          <span>{label}</span>
        </HeaderTitle>
        <div
          style={{
            height: "100%",
            margin: "10px",
            flexDirection: "column",
            display: "flex",
            marginRight: "20px",
          }}
        >
          <div style={{ flex: "1", marginTop: "40px" }}>
            <MdLogout
              size={24}
              color={"white"}
              onClick={logoff}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ flex: "1", marginTop: "15px" }}></div>
        </div>
      </header>
    </Container>
  );
};
