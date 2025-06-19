"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createPrestamos, updatePrestamos } from "@/model/prestamos/dataprestamo";
import { useRouter } from "next/navigation";

export function ProductForm({prestamo}: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      libro_id: prestamo?.libro_id,
      usuario_id: prestamo?.usuario_id,
      fecha_del_prestamo: prestamo?.fecha_del_prestamo,
      fecha_limite_a_devolver: prestamo?.fecha_limite_a_devolver,
      estado_del_prestamo: prestamo?.estado_del_prestamo,
    }
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      libro_id: Number(data.libro_id),
      usuario_id: data.usuario_id,
    };

    if (prestamo) {
      const res = await updatePrestamos(prestamo.libro_id, prestamo.usuario_id, prestamo.fecha_del_prestamo, payload);
      console.log(res)
    } else {
    await createPrestamos(payload);
    }

    router.push("/admin/dashboard/prestamos");
    router.refresh();
  });

  return (
    <form className="grid grid-cols-4 gap-3" onSubmit={onSubmit}>
      <Label>Codigo de libro</Label>
      <Input {...register("libro_id")} />

      <Label>Codigo de usuario</Label>
      <Input {...register("usuario_id")} />

      <Label>fecha del prestamo</Label>
      <Input {...register("fecha_del_prestamo")} />

      <Label>fecha limite a devolver</Label>
      <Input {...register("fecha_limite_a_devolver")} />

      <Label>estado del prestamo</Label>
      <Input {...register("estado_del_prestamo")} />

      <Button>
        {
          prestamo ? 'Update Product' : 'Create Product'
        }
      </Button>
    </form>
  );
}