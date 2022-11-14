export enum IToastType {
  success = "success",
  error = "danger",
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
  warning = "warning",
  info = "info",
  dark = "dark",
  light = "light",
  unknow = "undnow",
}
export enum IModalMessageType {
  success = "success",
  error = "danger",
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
  warning = "warning",
  info = "info",
  dark = "dark",
  light = "light",
  unknow = "undnow",
}

export interface IModalMessage {
  show: boolean;
  type: IModalMessageType;
  text: string;
}

export interface IToastProps {
  toastMessage: string;
  toastMessageType: IToastType;
  show: boolean;
}
