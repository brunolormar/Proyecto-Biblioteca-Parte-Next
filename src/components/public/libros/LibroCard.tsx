import React, { FC } from "react";
import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";
import { ILibro } from "../../../interfaces/ILibros";
import Link from 'next/link'

interface Props {
    libro: ILibro,
}

export const LibroCard:FC<Props> = ({libro}) => {
    return (
      <Card className="py-4 in-h-72 max-h-72 bg-white hover:bg-blue-200">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h5 className="font-bold text-sm">{libro.titulo}</h5>
        </CardHeader>
        <Link key={ libro.id } href ={`/public/libros/${libro.id}`}>
          <CardBody className="overflow-visible h-48 py-2 flex flex-row flex-wrap justify-center">
        
            <Image
              alt="Card background"
              className="object-cover rounded-xl max-h-44"
              src={libro.portada}
            />
          
          </CardBody>
        </Link>
        <CardFooter className="pb-0 pt-2 h-10 flex-col items-start">
          <Link key={ libro.clasificacion } href ={`/public/libros/${libro.clasificacion}`}>
            <p className="tect-tiny uppercase font-bold">
              {libro.clasificacion/*libro.categoria.name*/}
            </p>
          </Link>  
        </CardFooter>
      </Card>
    );
  }
