"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { LibroAcciones } from "./LibroAcciones";
import axios from "axios";

export default function LibrosClient({ libros }) {
  const [tituloInput, setTituloInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(tituloInput.toLowerCase())
  );

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (tituloInput.trim() !== "") {
        try {
          const res = await axios.get("http://localhost:3000/api/libros/titulos");
          const titulosFiltradas = res.data.filter((titulo: string) =>
            titulo.toLowerCase().includes(tituloInput.toLowerCase())
          );
          setSuggestions(titulosFiltradas);
        } catch (error) {
          console.error("Error al obtener títulos:", error);
        }
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [tituloInput]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Libros</h1>
        <Link href="/admin/dashboard/libros/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Libro
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <div className="relative" tabIndex={0}
            onBlur={() => setTimeout(() => setSuggestions([]), 100)} // para que dé tiempo al click
            >
            <Input
                className="pl-8"
                value={tituloInput}
                onChange={(e) => setTituloInput(e.target.value)}
                placeholder="Escribe un título..."
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg max-h-40 overflow-auto">
                {suggestions.map((titulo) => (
                    <li
                        key={titulo}
                        onMouseDown={() => {
                            setTituloInput(titulo);
                            setSuggestions([]);
                        }}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                        {titulo}
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
              <TableHead>ISBN</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Clasificación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Situación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {librosFiltrados.map((libro) => (
              <TableRow key={libro.id}>
                <TableCell>{libro.isbn}</TableCell>
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor.nombre}</TableCell>
                <TableCell>{libro.clasificacion}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      libro.estado === "en catalogo"
                        ? "bg-green-100 text-blue-800"
                        : "bg-yellow-100 text-red-800"
                    }`}
                  >
                    {libro.estado}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      libro.situacion === "libre"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {libro.situacion}
                  </span>
                </TableCell>
                <TableCell>
                  <LibroAcciones id={libro.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}