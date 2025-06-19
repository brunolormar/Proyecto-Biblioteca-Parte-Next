"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createAutores, updateAutores } from "@/model/autores/dataautor";
import { useRouter } from "next/navigation";

export function ProductForm({autor}: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      codigo_de_autor: autor?.codigo_de_autor,
      nombre: autor?.nombre,
    }
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (autor) {
      const res = await updateAutores(autor.codigo_de_autor, data);
      console.log(res)
    } else {
    await createAutores(data);
    }

    router.push("/admin/dashboard/autores");
    router.refresh();
  });

  return (
    <form className="grid grid-cols-4 gap-3" onSubmit={onSubmit}>
      <Label>Codigo de autores</Label>
      <Input {...register("codigo_de_autor")} />

      <Label>nombre</Label>
      <Input {...register("nombre")} />

      <Button>
        {
          autor ? 'Update Product' : 'Create Product'
        }
      </Button>
    </form>
  );
}