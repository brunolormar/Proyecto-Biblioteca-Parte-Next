"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Props {
  onBuscar: (valor: string) => void;
}

export default function PrestamoBusqueda({ onBuscar }: Props) {
  const [input, setInput] = useState("");
  const [sugerencias, setSugerencias] = useState<number[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (input.trim() !== "") {
        try {
          const res = await axios.get("http://localhost:3000/api/prestamos/libro_ids");
          const filtrados = res.data.filter((id: number) =>
            id.toString().includes(input.trim())
          );
          setSugerencias(filtrados);
        } catch (error) {
          console.error("Error al obtener libro_ids", error);
        }
      } else {
        setSugerencias([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <>
      <Input
        type="search"
        list="libro-ids"
        placeholder="Buscar por libro_id..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          onBuscar(e.target.value);
        }}
      />
      <datalist id="libro-ids">
        {sugerencias.map((id) => (
          <option key={id} value={id} />
        ))}
      </datalist>
    </>
  );
}