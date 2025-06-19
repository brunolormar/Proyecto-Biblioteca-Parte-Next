import React, { FC } from "react";
import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";
import { ILibro } from "../../../interfaces/ILibros";
import Link from 'next/link'

interface Props {
    libro: ILibro,
}

export const LibroCard:FC<Props> = ({libro}) => {
  const estadoColor =
    libro.situacion === "libre"
      ? "bg-green-200 text-green-800 border-green-400 hover:bg-green-300"
      : "bg-gray-200 text-gray-800 border-gray-400 hover:bg-gray-300"

  const buttonUrl = libro.situacion === "libre" ? `/public/libros/prestamo/${libro.id}` : `#` 

  return (
    <Card className="py-4 min-h-72 max-h-72 bg-white hover:bg-blue-200">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h5 className="font-bold text-sm">{libro.titulo}</h5>
      </CardHeader>
      <Link key={ libro.id } href ={`/public/libros/${libro.id}`}>
        <CardBody className="overflow-visible h-40 py-2 flex flex-row flex-wrap justify-center">
      
          <Image
            alt="Card background"
            className="object-cover rounded-xl max-h-36"
            src={libro.portada}
          />
        
        </CardBody>
      </Link>
      <CardFooter className="pb-0 pt-2 h-14 flex flex-row items-center justify-between">
        <p className="text-tiny uppercase font-bold">
          {libro.clasificacion/*libro.categoria.name*/}
        </p>
        <Link href={buttonUrl} className={libro.situacion !== "libre" ? "pointer-events-none" : ""}>
          <button
            className={`px-3 py-1.5 rounded-md text-sm font-medium border-2 ${estadoColor}`}
            disabled={libro.situacion !== "libre"}
          >
            {libro.situacion}
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
