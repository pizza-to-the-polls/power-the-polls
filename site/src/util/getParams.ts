/**
 * Return the GET params as an object
 **/
const getParams = () => (decodeURI(window.location.search)
  .replace("?", "")
  .split("&")
  .map(param => param.split("="))
  .reduce((values: { [key: string]: string }, [ key, value ]) => {
    values[ key ] = value;
    return values;
  }, {}));

export default getParams;
