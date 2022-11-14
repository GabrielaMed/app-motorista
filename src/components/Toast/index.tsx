import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { IToastProps, IToastType } from "../../Shared/Interfaces";

interface IToastMessageProps {
  toast: IToastProps;
  setToast: (value: IToastProps) => void;
}

export function ToastMessage({ toast, setToast }: IToastMessageProps) {
  return (
    <ToastContainer
      className="p-3"
      position={"middle-center"}
      style={{ zIndex: "5" }}
    >
      <Toast
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={9000}
        autohide
        bg={toast.toastMessageType}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Semalo</strong>
        </Toast.Header>
        <Toast.Body
          style={{
            color:
              toast.toastMessageType === IToastType.error ? "white" : "black",
            fontWeight: "600",
          }}
        >
          {toast.toastMessage}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
