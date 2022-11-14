const formatValue = (value: number): string =>
  Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value
  ); // TODO

export default formatValue;

export const getLocalDate = (value: string): string => {
  return new Date(value).toLocaleDateString();
};
export const getLocalTime = (value: string): string => {
  return new Date(value).toLocaleTimeString().substring(0, 5);
};
