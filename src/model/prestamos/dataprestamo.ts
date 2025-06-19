import axios from "axios";

export async function getPrestamos() {
  try {
    const res = await axios.get("http://localhost:3000/api/prestamos");
    return res.data; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getPrestamo(libro_id: number, usuario_id: string, fecha_del_prestamo: string) {
  const data = await fetch(`http://localhost:3000/api/prestamos/${libro_id}/${usuario_id}/${ fecha_del_prestamo}`, {
    cache: "no-store",
  });
  return await data.json();
}

export async function createPrestamos(prestamosData: any) {
  const res = await fetch(`http://localhost:3000/api/prestamos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prestamosData),
  });
  const data = await res.json();
  console.log(data);
}

export async function deletePrestamos(libro_id: number, usuario_id: string, fecha_del_prestamo: string) {
  const res = await fetch(`http://localhost:3000/api/prestamos/${libro_id}/${usuario_id}/${ fecha_del_prestamo}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updatePrestamos(libro_id: number, usuario_id: string, fecha_del_prestamo: string, newPrestamos: any) {
  const res = await fetch(`http://localhost:3000/api/prestamos/${libro_id}/${usuario_id}/${ fecha_del_prestamo}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPrestamos),
    cache: 'no-store'
  });
  return await res.json();
}