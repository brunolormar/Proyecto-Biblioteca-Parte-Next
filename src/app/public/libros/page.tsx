"use client"

import React, { useEffect, useState } from "react";
import { Tabla } from "../../../components/commons/Tabla/Tabla";
import ColumLibro, { ILibro } from "../../../interfaces/ILibros";
import { getLibros } from "../../../model/libros/datalibro";
import DataGrid from "../../../components/public/libros/DataGrid/DataGrid";
import { LibrosCardList } from "../../../components/public/libros/LibrosCardList";
import { Sidebar } from "@/components/public/libros/LibroSidebar";
import { HamburgerButton } from "@/components/public/libros/LibroHamburgerButton";

const LibrosPage =  () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [libros, setLibros] = useState<ILibro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState<string>("");
  const [nombreautorSeleccionada, setNombreautorSeleccionada] = useState<string>("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    console.log("pulsado", isSidebarOpen)
  }

  useEffect(() => {
    async function fetchLibros() {
      try {
        const res =  await getLibros();
        setLibros(res);
      } catch (error) {
        setError("Error al obtener los libros");
      } finally {
        setLoading(false);
      }
    }

    fetchLibros();
  }, []);

  // const libros: ILibro[] = await getLibros()
  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>{error}</p>;
  return (

    <section className='flex flex-col items-center'>
      <HamburgerButton onClick={toggleSidebar} />
      {/*<Sidebar isOpen={isSidebarOpen} />*/}
      <Sidebar isOpen={isSidebarOpen} onCategoriaChange={setClasificacionSeleccionada} onAutorChange={setNombreautorSeleccionada}/>
      <div className="flex-1 flex flex-col lg:ml-64">
      <h2 className='text-4xl m-8'>Sección de Libros</h2>
      
      {/*<Tabla
        rows={libros}
        columns={ColumLibro}
        key='isbn' />*/}
      {/* Botón para abrir el drawer */}
      
      {/*<LibrosCardList libros={libros} />*/}
      <LibrosCardList libros={
        libros.filter((libro) => {
          const coincideClasificacion = clasificacionSeleccionada ? libro.clasificacion === clasificacionSeleccionada : true;
          const coincideAutor = nombreautorSeleccionada ? libro.autor_id === nombreautorSeleccionada : true;
          return coincideClasificacion && coincideAutor;
        })
      } />
      {/*<DataGrid libros={libros} columns={ColumLibro} />*/}
      </div>
    </section>

  )
}

export default LibrosPage



  

