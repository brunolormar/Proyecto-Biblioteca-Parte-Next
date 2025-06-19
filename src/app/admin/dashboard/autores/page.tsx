import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAutores } from "@/model/autores/dataautor";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AutorAcciones } from "./AutorAcciones";
import { AutoresBusqueda } from "./AutoresBusqueda";

export const dynamic = "force-dynamic";

export default async function AutoresPage() {
  const autores = await getAutores();

  return (
    <AutoresBusqueda autores={autores} />
  );
}