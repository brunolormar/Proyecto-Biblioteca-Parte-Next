"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { deleteUsuarios } from "@/model/usuarios/datausuario"
import Image from "next/image"

export function UsuarioAcciones({ id }: { id: string }) {
  const router = useRouter()

  async function handleRemoveProduct() {
    await deleteUsuarios(id)
    router.refresh()
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="ghost"  
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/dashboard/usuarios/new?id=${id}`);
        }}
      >
        {/*Editar*/}
        <Image src="/images/Boton-de-editar.png" alt="Editar" width={40} height={40} />
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
        <Image src="/images/delete-logo-button-icon.png" alt="Editar" width={40} height={40} />
      </Button>
    </div>
  )
}