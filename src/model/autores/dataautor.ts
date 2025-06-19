import axios from "axios";

export async function getAutores() {
  try {
    const res = await axios.get("http://localhost:3000/api/autores");
    return res.data; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getAutor(id: string) {
  const data = await fetch(`http://localhost:3000/api/autores/${id}`, {
    cache: "no-store",
  });
  return await data.json();
}

export async function createAutores(autoresData: any) {
  const res = await fetch(`http://localhost:3000/api/autores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(autoresData),
  });
  const data = await res.json();
  console.log(data);
}

export async function deleteAutores(id: string) {
  const res = await fetch(`http://localhost:3000/api/autores/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updateAutores(id: string, newAutores: any) {
  const res = await fetch(`http://localhost:3000/api/autores/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAutores),
    cache: 'no-store'
  });
  return await res.json();
}

export async function buscarAutoresPorId(parcial: string): Promise<{ id: string; nombre: string }[]> {
  const res = await fetch(`http://localhost:3000/api/autores/buscar?id=${parcial}`);
  if (!res.ok) return [];
  return res.json();
}