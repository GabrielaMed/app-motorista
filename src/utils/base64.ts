export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(",");
  const firstArrayElement = arr[0];
  const mimeArray = firstArrayElement.match(/:(.*?);/);
  if (!mimeArray) throw new Error("Erro ao converter imagem");
  const mime = mimeArray[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};
