import React from 'react'
import { LibroDetail2 } from '../../../../components/public/libros/LibroDetail2';
import apiLibros from '../../../../model/libros/apiLibros';
import { Clasificacion, ILibro } from '../../../../interfaces/ILibros';
import { LibroCard } from '../../../../components/public/libros/LibroCard';

const LibroPage2 = async ({params: {clasificacion}}: {params: {clasificacion:Clasificacion}}) => {
    
  const libros: ILibro[] = await apiLibros.porClasificacion(clasificacion);

  console.log("------------")
  console.log(libros)

  if (!libros || libros.length === 0) {
    return (
      <section className="container mx-auto px-4 mt-6 border min-h-screen">
        <p>No se encontraron libros para la clasificación: <strong>{clasificacion}</strong>.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 mt-6 border min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Libros en la clasificación: {clasificacion}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {libros.map((libro) => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </div>
    </section>
  );

  /*return (
    <section className="container mx-auto px-4 mt-6 border min-h-screen">
      <LibroDetail2 libro={libro} />
    </section>
  )*/
 
}

export default LibroPage2
