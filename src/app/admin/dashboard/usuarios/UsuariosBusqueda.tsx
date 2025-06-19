"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UsuarioAcciones } from "./UsuarioAcciones";
import axios from "axios";

export function UsuariosBusqueda({ usuarios }: { usuarios: any[] }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filtrados, setFiltrados] = useState(usuarios);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (usernameInput.trim() !== "") {
        try {
          const res = await axios.get("http://localhost:3000/api/user/usernames");
          const nombresFiltrados = res.data.filter((username: string) =>
            username.toLowerCase().includes(usernameInput.toLowerCase())
          );
          setSuggestions(nombresFiltrados);
        } catch (error) {
          console.error("Error al obtener usernames:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [usernameInput]);

  useEffect(() => {
    const nuevos = usuarios.filter((usuario) =>
      usuario.username.toLowerCase().includes(usernameInput.toLowerCase())
    );
    setFiltrados(nuevos);
  }, [usernameInput]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Usuarios</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <div className="relative">
            <Input
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Escribe un nombre de usuario..."
              className="pl-8"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-40 overflow-auto">
                {suggestions.map((nombre) => (
                  <li
                    key={nombre}
                    onClick={() => {
                      setUsernameInput(nombre);
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
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.password}</TableCell>
                <TableCell>{usuario.username}</TableCell>
                <TableCell>
                  <UsuarioAcciones id={usuario.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}