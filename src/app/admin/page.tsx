'use client';

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Note</h1>
//     </div>
//   );
// }

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateNote() {
  const [codigo_de_autor, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');

  const router = useRouter();

  const create = async(/*e*/) => {
    /*e.preventDefault(); // Evita la recarga de la página*/
    
    // const db = new PocketBase('http://127.0.0.1:8090');

    // await db.records.create('notes', {
    //   title,
    //   content,
    // });
    try {
      await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo_de_autor,
          nombre,
        }),
      });

      setNombre('');
      setCodigo('');

      router.refresh();
    } catch (error) {
      console.error('Error al crear el autor:', error);
    }
  };

  return (
    <form onSubmit={create}>
      <h3>Crear un nuevo autor</h3>
      <input
        type="text"
        placeholder="Codigo de autor"
        value={codigo_de_autor}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <textarea
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">
        Crear autor
      </button>
      <p>Esto es una prueba</p>
    </form>
  );
}