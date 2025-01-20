import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <div className=" grid grid-cols-1" style={{borderRadius:'0.5rem', borderWidth:'3px', borderColor:'orange'}}>
      <div className="max-w-xs bg-white py-8 px-4">
        <Textarea
        isDisabled
        label="¿Esto es una biblioteca de verdad?"
        labelPlacement="outside"
        placeholder="Enter your description"
        defaultValue="No, es un proyecto de una modulo de informatica"
        className="max-w-xs py-8"
        />
      </div>
      <div className="max-w-xs bg-white py-8 px-4">
        <Textarea
        isDisabled
        label="¿Aqui se pueden compra libros?"
        labelPlacement="outside"
        placeholder="Enter your description"
        defaultValue="No, esto es una pagina de una biblioteca, no de una libreria"
        className="max-w-xs py-8"
        />
      </div>
    </div>
  );
}

