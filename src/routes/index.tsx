import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { Invoices } from "../pages/Invoices";
import { QRCodePage } from "../pages/QRCode";
import { Photos } from "../pages/Photo";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Photos />} />
    <Route path="/invoices" element={<Invoices />} />
    <Route path="/qrcode" element={<QRCodePage />} />
    <Route path="/takePhoto" element={<Photos/>}/>
  </Routes>
);
