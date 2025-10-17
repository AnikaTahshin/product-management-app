import { store } from "@/redux/store";
import { setToken } from "@/redux/store";
import { addProductType } from "@/types/types";



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


export async function deleteProductApi(id: string) {
  try {
    const token = store.getState().auth.token;
    const res = await fetch(`https://api.bitechx.com/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete product. Status: ${res.status}`);
    }

    return await res.json(); // Expected { id: "12345" }
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
}


// get category id
export async function categoryIdApi() {
  try {
    const token = store.getState().auth.token;

    const res = await fetch("https://api.bitechx.com/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      
    });

    const result =  await res.json();
    return result
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
}


export async function AddProductApi(data:addProductType) {


  try {
    const token = store.getState().auth.token;

    const res = await fetch("https://api.bitechx.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result =  await res.json();
    return result
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
}



export async function filterProductApi(id: string) {
  try {
    const token = store.getState().auth.token;
    const res = await fetch(`https://api.bitechx.com/products?categoryId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    return result;
  } catch (err) {
    console.error("Error filtering products:", err);
    throw err;
  }
}


