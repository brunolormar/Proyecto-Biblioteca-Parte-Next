import React, { useState } from "react";
import { Tabla } from "../../../components/commons/Tabla/Tabla";
import ColumLibro, { ILibro } from "../../../interfaces/ILibros";
import { getLibros } from "../../../model/libros/datalibro";
import DataGrid from "../../../components/public/libros/DataGrid/DataGrid";
import { LibrosCardList } from "../../../components/public/libros/LibrosCardList";

const LibrosPage = async () => {

  const libros: ILibro[] = await getLibros()
  return (

    <section className='flex flex-col items-center'>
      <h2 className='text-4xl m-8'>Sección de Libros</h2>
      {/*<Tabla
        rows={libros}
        columns={ColumLibro}
        key='isbn' />*/}
      {/* Botón para abrir el drawer */}
      
      <LibrosCardList libros={libros} /> 
      {/*<DataGrid libros={libros} columns={ColumLibro} />*/}
    </section>

  )
}

export default LibrosPage
  

