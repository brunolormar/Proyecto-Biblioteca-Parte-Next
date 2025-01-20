import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";
import React, { FC } from "react";
import { ILibro } from "../../../interfaces/ILibros";

// import Image from 'next/image'

interface Props {
    libro: ILibro,
}

export const LibroDetail2:FC<Props> = ({libro}) => {
  // Format the date to a readable string
  const formattedDate = libro.fecha_de_publicacion
    ? new Date(libro.fecha_de_publicacion).toLocaleDateString()
    : "Fecha no disponible";

  return (
    <Card className="py-4 frex flex-row flex-nowrap bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
      <CardHeader className="pb-0 pt-2 px-4 basis-1/3">
        <Image 
          alt="Card background"
          className="object-cover rounded-xl"
          src={libro.portada}
          width={270} 
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 basis-2/4">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ libro.titulo }</h2>
        <h2 className="mb-2 text-lg">Nombre del Autor: { /*libro.autor_id*/libro.Autores?.nombre || "Autor no disponible" }</h2>
        <h2 className="mb-2 text-lg">isbn: { libro.isbn }</h2>
        <h2 className="mb-2 text-lg">Fecha de publicacion: { formattedDate }</h2>
        <h2 className="mb-2 text-lg">Editorial: { libro.editorial }</h2>
        <h2 className="mb-2 text-lg">Numero de paginas: { libro.numero_de_paginas }</h2>
        <h2 className="mb-2 text-lg">Serie: { libro.serie }</h2>
        <h2 className="mb-2 text-lg">Clasificacion por edad: {libro.clasificacion/*libro.categoria.name*/}</h2>
        <h2 className="mb-2 text-lg">Estado: { libro.estado }</h2>
        <h2 className="mb-2 text-lg">Situacion de prestamo: { libro.situacion }</h2>
      </CardBody>
      <CardFooter>
        {/*<h3>{libro.situacion}</h3>*/}
      </CardFooter>
    </Card> 
  );
  /*console.log(libro);*/
}

