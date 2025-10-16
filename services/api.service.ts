import { store } from "@/redux/store";
import { setToken } from "@/redux/store";

const baseUrl = "https://api.bitechx.com";

export async function loginApi(email: string) {
  try {
    const res = await fetch("https://api.bitechx.com/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();

    store.dispatch(setToken(data.token));

    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

export async function productsApiLength() {
  try {
   
const token = store.getState().auth.token;

    const res = await fetch("https://api.bitechx.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    

    const data = await res.json();


    return data;
  } catch (err) {
    console.error("Error in productsApi:", err);
    throw err;
  }
}

export async function productsApi(offset:number,limit:number) {
  try {
   
const token = store.getState().auth.token;

    const res = await fetch(`https://api.bitechx.com/products?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    

    const data = await res.json();


    return data;
  } catch (err) {
    console.error("Error in productsApi:", err);
    throw err;
  }
}



export async function singleProductApi(id:any) {
  try {
   
const token = store.getState().auth.token;

    const res = await fetch(`https://api.bitechx.com/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    

    const data = await res.json();


    return data;
  } catch (err) {
    console.error("Error in productsApi:", err);
    throw err;
  }
}