const defaultUrl = "https://snu-coin.herokuapp.com";
const LOGIN_KEY = "LOGIN_KEY";

const getDefaultHeaders = () => {
  const defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (localStorage.getItem(LOGIN_KEY))
    defaultHeaders["Authorization"] = `Key ${localStorage.getItem(LOGIN_KEY)}`;
  return defaultHeaders;
};

const post = async (url, body = {}, extraHeaders = {}) => {
  try {
    console.log(`post ${defaultUrl}/${url}...`);
    const res = await fetch(`${defaultUrl}/${url}`, {
      method: "POST",
      body: new URLSearchParams(body).toString(),
      headers: { ...getDefaultHeaders(), ...extraHeaders },
    });

    if (res.status >= 400 || !res.ok) {
      return `${res.status}, ${res.statusText}`;
    }

    return await res.json();
  } catch (error) {
    console.error(error.message);
    throw new Error(error);
  }
};

const get = async (url, query = {}, extraHeaders = {}) => {
  const res = await fetch(`${defaultUrl}/${url}`, {
    method: "GET",
    headers: { ...getDefaultHeaders(), ...extraHeaders },
  });

  return await res.json();
};

const deleteWrapper = async (url, extraHeaders = {}) => {
  const res = await fetch(`${defaultUrl}/${url}`, {
    method: "DELETE",
    headers: { ...getDefaultHeaders(), ...extraHeaders },
  });

  return await res.json();
};

const login = async (name, password) => {
  return await post("login", { name, password });
};

const loginByKey = async (key) => {
  return await post("login_by_key", { key });
};

const loadAssets = async () => {
  return await get("assets");
};

const loadMarkets = async () => {
  return await get("markets");
};

const loadMarket = async (market) => {
  return await get(`markets/${market}`);
};

const loadOrders = async () => {
  return await get("orders");
};

const postOrder = async (price, quantity, market, side) => {
  return await post("orders", { price, quantity, market, side });
};

const deleteOrder = async (id) => {
  return await deleteWrapper(`orders/${id}`);
};

export {
  LOGIN_KEY,
  login,
  loginByKey,
  loadMarket,
  loadMarkets,
  loadAssets,
  loadOrders,
  postOrder,
  deleteOrder,
};
