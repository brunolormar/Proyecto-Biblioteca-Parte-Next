import React from "react";

import PreguntasTextarea from "../../../components/public/preguntas-frecuentes/PreguntasTextarea";

const PreguntasPage = async () => {

  return (
    <section className='flex flex-col items-center'>
      <h2 className='text-4xl m-8'>Dudas resueltas relacionadas con la biblioteca</h2>
  
      <PreguntasTextarea />      
    </section>
  )
}

export default PreguntasPage
  

