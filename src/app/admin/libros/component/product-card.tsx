"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteLibros } from "@/model/libros/datalibro";
import { useRouter } from "next/navigation";

export function ProductCard({ libro }: any) {
  const router = useRouter();

  async function handleRemoveProduct(id: string) {
    await deleteLibros(id);
    router.refresh();
  }
  
  return (
    <Card onClick={() => {
        router.push(`/admin/libros/${libro.id}`);
      }}>
        <CardHeader>
            <CardTitle className="flex justify-between">
              {libro.titulo}
              <span className="text-sm font-bold text-gray-500"
              >
              {libro.clasificacion}  
              </span>
            </CardTitle>
        </CardHeader>
        <img src={libro.portada} alt="" />
        <CardContent>
            <p>{libro.situacion}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
        <Button
          className="mt-5"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/libros/${libro.id}/edit`);
          }}
        >
          Editar
        </Button>
        <Button
          className="mt-5"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveProduct(libro.id);
          }}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
