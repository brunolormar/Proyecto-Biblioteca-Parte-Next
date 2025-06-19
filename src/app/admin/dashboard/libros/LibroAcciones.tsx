"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { deleteLibros } from "@/model/libros/datalibro"
import Image from "next/image"

export function LibroAcciones({ id }: { id: string }) {
  const router = useRouter()

  async function handleRemoveProduct() {
    await deleteLibros(id)
    router.refresh()
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="ghost"  
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/libros/${id}/edit`);
        }}
      >
        {/*Editar*/}
        <Image src="/images/Boton-de-editar.png" alt="Editar" width={60} height={60} />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation()
          handleRemoveProduct()
        }}
      >
        {/*Borrar*/} {/*variant="destructive"*/}
        <Image src="/images/delete-logo-button-icon.png" alt="Editar" width={60} height={60} />
      </Button>
    </div>
  )
}