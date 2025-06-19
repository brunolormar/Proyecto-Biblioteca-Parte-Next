import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLibro } from "@/model/libros/datalibro";
import Link from "next/link";
import {buttonVariants} from '@/components/ui/button'

interface Props {
    params: {
        id: string;
    };
}

async function ProductDetailPage({ params }: Props) {
  const libro = await getLibro(params.id);

  const formattedDate = libro.fecha_de_publicacion
    ? new Date(libro.fecha_de_publicacion).toLocaleDateString()
    : "Fecha no disponible";

  return <div
    className="flex justify-center items-center h-screen"
  >
    <Card className="py-4 frex flex-row flex-nowrap bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
        <CardHeader className="pb-0 pt-2 px-4 basis-1/3">
            <CardTitle className="flex justify-between">
                Product Detail: {libro.id}
                <Link
                    className={buttonVariants()}
                    href="/admin"
                >
                    Go back
                </Link>
            </CardTitle>
        </CardHeader>
        <CardContent className="overflow-visible py-2 basis-2/4">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ libro.titulo }</h2>
        <h2 className="mb-2 text-lg">Nombre del Autor: { libro.autor.nombre || "Autor no disponible" }</h2>
        <h2 className="mb-2 text-lg">isbn: { libro.isbn }</h2>
        <h2 className="mb-2 text-lg">Fecha de publicacion: { formattedDate }</h2>
        <h2 className="mb-2 text-lg">Editorial: { libro.editorial }</h2>
        <h2 className="mb-2 text-lg">Numero de paginas: { libro.numero_de_paginas }</h2>
        <h2 className="mb-2 text-lg">Serie: { libro.serie }</h2>
        <h2 className="mb-2 text-lg">Clasificacion por edad: {libro.clasificacion/*libro.categoria.name*/}</h2>
        <h2 className="mb-2 text-lg">Estado: { libro.estado }</h2>
        <h2 className="mb-2 text-lg">Situacion de prestamo: { libro.situacion }</h2>
            <img src={libro.portada} alt="Card background"
                className="w-full h-64 object-cover"
                width={270}
            />
        </CardContent>
    </Card>

  </div>;
}

export default ProductDetailPage;