import React from "react";
import { Container } from "./styles";

interface props {
  children?: any;
}

const Footer = ({ children }: props) => {
  return <Container>{children}</Container>;
};

export default Footer;
