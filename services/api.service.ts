import { store } from "@/redux/store";
import { setToken } from "@/redux/store";


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

export async function productsApi(offset: number, limit: number) {
  try {
    const token = store.getState().auth.token;

    const res = await fetch(`https://api.bitechx.com/products?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text(); 
      throw new Error(`Request failed (${res.status}): ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in productsApi:", err);
    throw err;
  }
}




export async function singleProductApi(slug: string) {
  try {
    const token = store.getState().auth.token;
    const res = await fetch(`https://api.bitechx.com/products/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching single product:", err);
    throw err;
  }
}

export async function updateProductApi(id: string, data: any) {
  try {
    const token = store.getState().auth.token;
    const res = await fetch(`https://api.bitechx.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
}
