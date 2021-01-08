import deepEqual from "deep-equal";

export default function setSearchParams({ params, paramTypes, push }) {
  const queryParams = new URLSearchParams(window.location.search);
  Object.keys(params).forEach((key) => {
    if (
      paramTypes[key].cleanDefault &&
      deepEqual(paramTypes[key].default, params[key])
    ) {
      queryParams.delete(key);
    } else {
      const value = params[key];
      const type = paramTypes[key].type;
      let finalValue;

      switch (type) {
        case "number":
          finalValue = `${value}`;
          break;

        case "string":
          finalValue = `${value}`;
          break;

        case "json":
          finalValue = JSON.stringify(value);
          break;

        default:
          finalValue = `${value}`;
          break;
      }

      queryParams.set(key, finalValue);
    }
  });
  if (push) {
    window.history.pushState(null, null, "?" + queryParams.toString());
  } else {
    window.history.replaceState(null, null, "?" + queryParams.toString());
  }
  const queryStringChange = new Event("popstate");
  window.dispatchEvent(queryStringChange);
}
