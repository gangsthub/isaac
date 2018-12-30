export default (string) => {
  return string
    .normalize('NFKD') // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    .replace(/[\u0300-\u036f]/g, "") // accents and diacritics
    .toLowerCase()
    .replace(/\s/, '-')
}
