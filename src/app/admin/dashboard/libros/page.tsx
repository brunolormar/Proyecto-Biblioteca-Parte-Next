import { getLibros } from "@/model/libros/datalibro";
import LibrosClient from "./LibrosBusqueda";

export const dynamic = "force-dynamic";

export default async function LibrosPage() {
  const libros = await getLibros();
  return <LibrosClient libros={libros} />;
}