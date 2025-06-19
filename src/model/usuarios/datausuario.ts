import axios from "axios";

export async function getUsuarios() {
  try {
    const res = await axios.get("http://localhost:3000/api/user");
    return res.data; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getUsuario(id: string) {
  const data = await fetch(`http://localhost:3000/api/user/${id}`, {
    cache: "no-store",
  });
  return await data.json();
}

export async function deleteUsuarios(id: string) {
  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updateUsuarios(id: string, newUsuarios: any) {
  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUsuarios),
    cache: 'no-store'
  });
  return await res.json();
}