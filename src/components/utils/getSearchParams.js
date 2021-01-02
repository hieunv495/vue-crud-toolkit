export default function getSearchParams(paramTypes) {
  const params = {};

  const queryParams = new URLSearchParams(window.location.search);

  Object.keys(paramTypes).forEach((key) => {
    params[key] = paramTypes[key].default;
    try {
      const text = queryParams.get(key);
      if (text) {
        switch (paramTypes[key].type) {
          case "string":
            params[key] = text;
            break;
          case "number":
            params[key] = parseInt(text);
            break;
          case "json":
            params[key] = JSON.parse(text);
            break;
          default:
            break;
        }
      }
    } catch (e) {
      console.warn(e);
    }
  });

  return params;
}
