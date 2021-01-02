export default function setSearchParams(params, push = false) {
  const queryParams = new URLSearchParams(window.location.search);
  Object.keys(params).forEach((key) => {
    queryParams.set(key, JSON.stringify(params[key]));
  });
  if (push) {
    window.history.pushState(null, null, "?" + queryParams.toString());
  } else {
    window.history.replaceState(null, null, "?" + queryParams.toString());
  }
  const queryStringChange = new Event("popstate");
  window.dispatchEvent(queryStringChange);
}
