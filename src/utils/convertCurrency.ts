export const convertValues = (
  value: number | string,
  convertionType?: string
) => {
  if (convertionType === "COMMA_TO_DOT") {
    return Number(value.toString().split(/R\$\s/gi).join("").replace(",", "."));
  }
  return `R$ ${Number(value)
    .toFixed(2)
    ?.toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
