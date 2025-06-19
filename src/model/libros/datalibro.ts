import axios from "axios";

export async function getLibros() {
  try {
    const res = await axios.get("http://localhost:3000/api/libros");
    return res.data; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getclasificacion() {
  try {
    const res = await axios.get("http://localhost:3000/api/libros/categoria");
    console.log(res);
    // return res; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getSituacion() {
  try {
    const res = await axios.get("http://localhost:3000/api/libros/SituacionPres");
    console.log(res);
    // return res; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getEstado() {
  try {
    const res = await axios.get("http://localhost:3000/api/libros/Catalogo");
    console.log(res);
    // return res; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getNombreautor() {
  try {
    const res = await axios.get("http://localhost:3000/api/libros/Filtronombre");
    console.log(res);
    // return res; // Axios devuelve la respuesta en `data` automáticamente
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getLibro(id: string) {
  const data = await fetch(`http://localhost:3000/api/libros/${id}`, {
    cache: "no-store",
  });
  return await data.json();
}

export async function createLibros(librosData: any) {
  const res = await fetch(`http://localhost:3000/api/libros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(librosData),
  });
  const data = await res.json();
  console.log(data);
}

export async function deleteLibros(id: string) {
  const res = await fetch(`http://localhost:3000/api/libros/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updateLibros(id: string, newLibro: any) {
  const res = await fetch(`http://localhost:3000/api/libros/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newLibro),
    cache: 'no-store'
  });
  return await res.json();
}

export async function updateLibroSituacion(id: number, nuevaSituacion: string) {
  return await updateLibros(id.toString(), {
    situacion: nuevaSituacion,
  });
}

// export async function getLibros() {

//     try{
//       const res = await fetch('http://localhost:3000/api/libros', { cache: 'no-store'})
//       return res.json()
//     }catch(error){
//       throw new Error('Failed to fetch data')
//     }
//   } Ctrl + k + c Comentar lo selecionado

  