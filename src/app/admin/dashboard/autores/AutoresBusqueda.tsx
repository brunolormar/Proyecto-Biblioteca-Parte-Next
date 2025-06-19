"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AutorAcciones } from "./AutorAcciones";
import axios from "axios";

export function AutoresBusqueda({ autores }: { autores: any[] }) {
  const [nombreInput, setNombreInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filtrados, setFiltrados] = useState(autores);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (nombreInput.trim() !== "") {
        try {
          const res = await axios.get("http://localhost:3000/api/autores/nombres");
          const nombresFiltrados = res.data.filter((nombre: string) =>
            nombre.toLowerCase().includes(nombreInput.toLowerCase())
          );
          setSuggestions(nombresFiltrados);
        } catch (error) {
          console.error("Error al obtener nombres:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [nombreInput]);

  useEffect(() => {
    const nuevos = autores.filter((autor) =>
      autor.nombre.toLowerCase().includes(nombreInput.toLowerCase())
    );
    setFiltrados(nuevos);
  }, [nombreInput]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Autores</h1>
        <Link href="/admin/dashboard/autores/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Autor
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <div className="relative">
            <Input
              value={nombreInput}
              onChange={(e) => setNombreInput(e.target.value)}
              placeholder="Escribe un nombre..."
              className="pl-8"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg max-h-40 overflow-auto">
                {suggestions.map((nombre) => (
                  <li
                    key={nombre}
                    onClick={() => {
                      setNombreInput(nombre);
                      setSuggestions([]);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código de autor</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((autor) => (
              <TableRow key={autor.codigo_de_autor}>
                <TableCell>{autor.codigo_de_autor}</TableCell>
                <TableCell>{autor.nombre}</TableCell>
                <TableCell>
                  <AutorAcciones id={autor.codigo_de_autor} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}