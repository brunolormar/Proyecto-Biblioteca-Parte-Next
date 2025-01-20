import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <div className=" grid grid-cols-1" style={{borderRadius:'0.5rem', borderWidth:'3px', borderColor:'green'}}>
      <div className="max-w-xs bg-white py-8 px-4">
        <Textarea
        isDisabled
        label="Nuevos libros disponibles en la biblioteca"
        labelPlacement="outside"
        placeholder="Enter your description"
        defaultValue="Los libros 7 y 23 de la serie 'futbolisimos' se han añadido a la lista de libros de la biblioteca"
        className="max-w-xs py-8"
        />
      </div>
      <div className="max-w-xs bg-white py-8 px-4">
        <Textarea
        isDisabled
        label="Nuevo libro disponible en la biblioteca"
        labelPlacement="outside"
        placeholder="Enter your description"
        defaultValue="El libro 'El cartero siempre llama mill veces' se ha añadido a la lista de libros de la biblioteca"
        className="max-w-xs py-8"
        />
      </div>
    </div>
  );
}
