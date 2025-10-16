export async function loginApi(email: string) {

  
  
  const res = await fetch("https://api.bitechx.com/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
    
  const data = await res.json();
  console.log("server", data)
  return data;
}