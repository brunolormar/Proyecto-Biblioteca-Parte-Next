"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { deletePrestamos } from "@/model/prestamos/dataprestamo"
import Image from "next/image"

interface Props {
  libro_id: number;
  usuario_id: string;
  fecha_del_prestamo: string;
}

export function PrestamoAcciones({ libro_id, usuario_id, fecha_del_prestamo }: Props) {
  const router = useRouter()

  async function handleRemoveProduct() {
    await deletePrestamos(libro_id, usuario_id, fecha_del_prestamo)
    router.refresh()
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="ghost"  
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/dashboard/prestamos/new?libro_id=${libro_id}&usuario_id=${usuario_id}&fecha_del_prestamo=${encodeURIComponent(fecha_del_prestamo)}`);
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