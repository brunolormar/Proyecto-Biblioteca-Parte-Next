import { ILibro } from "../../../interfaces/ILibros";
import React, { FC } from "react";
import { LibroCard } from "./LibroCard";
import Link from "next/link";

interface Props {
    libros:ILibro[];
}

export const LibrosCardList:FC<Props> = ({libros}) => {
  return (
    <section className="gap-2 grid grid-cols-2 sm:grid-cols-4" >
    {
      libros.map( (libro) => (
        <article key={libro.id} className="basis-1/4 p-2 bg-white hover:bg-blue-200" style={{borderRadius:'0.5rem', borderWidth:'3px', borderColor:'black'}}>
          {/* <Link key={restaurant.id} href={`/${restaurant.id}`}>
              {restaurant.name}
            </Link> */}
          {/*<Link key={ libro.id } href ={`/public/libros/${libro.id}`}>*/}
            <LibroCard key={libro.id} libro = {libro }/>
          {/*</Link>*/}
        </article>
      ))
    }
  </section>
  )
}
