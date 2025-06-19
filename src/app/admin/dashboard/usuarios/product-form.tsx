"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { updateUsuarios } from "@/model/usuarios/datausuario";
import { useRouter } from "next/navigation";

export function ProductForm({usuario}: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: usuario?.email,
      password: usuario?.password,
      username: usuario?.username,
    }
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (usuario) {
      const res = await updateUsuarios(usuario.id, data);
      console.log(res)
    } else {
    /*await createUsuarios(data);*/
    }

    router.push("/admin/dashboard/usuarios");
    router.refresh();
  });

  return (
    <form className="grid grid-cols-4 gap-3" onSubmit={onSubmit}>
      <Label>email</Label>
      <Input {...register("email")} />

      <Label>password</Label>
      <Input {...register("password")} />

      <Label>username</Label>
      <Input {...register("username")} />

      <Button>
        {
          usuario ? 'Update Product' : 'Create Product'
        }
      </Button>
    </form>
  );
}