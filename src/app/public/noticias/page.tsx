import React from "react";

import NoticiasTextarea from "../../../components/public/noticias/NoticiasTextarea";

const NoticiasPage = async () => {

  return (
    <section className='flex flex-col items-center'>
      <h2 className='text-4xl m-8'>Aqui se anuancian nuevos libros de la biblioteca o otras cosas relacionadas con esta</h2>
      
      <NoticiasTextarea />      
    </section>
  )
}

export default NoticiasPage
  

