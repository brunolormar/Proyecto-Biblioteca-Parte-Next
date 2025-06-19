"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createLibros, updateLibros} from "@/model/libros/datalibro"
import { useParams, useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { buscarAutoresPorId } from "@/model/autores/dataautor";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";

export function ProductForm({libro}: any) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      id: libro?.id,
      autor_id: libro?.autor_id,
      titulo: libro?.titulo,
      isbn: libro?.isbn,
      fecha_de_publicacion: libro?.fecha_de_publicacion,
      editorial: libro?.editorial,
      numero_de_paginas: libro?.numero_de_paginas,
      serie: libro?.serie,
      clasificacion: libro?.clasificacion,
      estado: libro?.estado,
      situacion: libro?.situacion,
      portada: libro?.portada,
    }
  });

  const [date, setDate] = useState<Date | undefined>(
    libro?.fecha_de_publicacion ? new Date(libro.fecha_de_publicacion) : undefined
  );
  
  const [autorInput, setAutorInput] = useState(libro?.autor_id || "");
  const [suggestions, setSuggestions] = useState<{ id: string; nombre: string }[]>([]);

  const [editorialInput, setEditorialInput] = useState(libro?.editorial || "");
  const [suggestions2, setSuggestions2] = useState<string[]>([]);

  const [serieInput, setSerieInput] = useState(libro?.serie || "");
  const [suggestions3, setSuggestions3] = useState<string[]>([]);

  const [clasificaciones, setClasificaciones] = useState<string[]>([]);
  const clasificacionValue = watch("clasificacion");

  const [Situaciones, setSituaciones] = useState<string[]>([]);
  const SituacionValue = watch("situacion");

  const [Estados, setEstados] = useState<string[]>([]);
  const EstadoValue = watch("estado");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (autorInput.trim() !== "") {
        const results = await buscarAutoresPorId(autorInput);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }

      if (editorialInput.trim() !== "") {
        try {
          const res = await axios.get("http://localhost:3000/api/libros/editoriales");

          const editorialesFiltradas = res.data.filter(
            (editorial: string) =>
              editorial.toLowerCase().includes(editorialInput.toLowerCase())
          );

          setSuggestions2(editorialesFiltradas);
        } catch (error) {
          console.error("Error al obtener editoriales:", error);
        }
      }

      if (serieInput.trim() !== "") {
        try {
          const res = await axios.get("http://localhost:3000/api/libros/series");

          const seriesFiltradas = res.data.filter(
            (serie: string) =>
              serie.toLowerCase().includes(serieInput.toLowerCase())
          );

          setSuggestions3(seriesFiltradas);
        } catch (error) {
          console.error("Error al obtener series:", error);
        }
      }
    }, 300);

    const fetchClasificaciones = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/libros/categoria");
        const datos = res.data.map((obj: any) => obj.clasificacion);
        setClasificaciones(datos);
      } catch (error) {
        console.error("Error al obtener clasificaciones:", error);
      }
    };
    fetchClasificaciones();

    const fetchSituaciones = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/libros/SituacionPres");
        const datos = res.data.map((obj: any) => obj.situacion);
        setSituaciones(datos);
      } catch (error) {
        console.error("Error al obtener la situacion:", error);
      }
    };
    fetchSituaciones();

    const fetchEstados = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/libros/Catalogo");
        const datos = res.data.map((obj: any) => obj.estado);
        setEstados(datos);
      } catch (error) {
        console.error("Error al obtener el estado:", error);
      }
    };
    fetchEstados();
  
    return () => clearTimeout(timeout);
  }, [autorInput, editorialInput, serieInput]);

  const router = useRouter();
  const params = useParams<{id: string}>();
  console.log(params)

  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      const res = await updateLibros(params.id, {
        ...data,
        id: parseFloat(data.id),
        numero_de_paginas: parseFloat(data.numero_de_paginas),
      })
      console.log(res)
    } else {
    await createLibros({
      ...data,
      id: parseFloat(data.id),
      numero_de_paginas: parseFloat(data.numero_de_paginas),
    });
    }

    router.push("/admin/dashboard/libros");
    router.refresh();
  });

  return (
    <form className="grid grid-cols-4 gap-3" onSubmit={onSubmit}>
      <Label>Libro id</Label>
      <Input {...register("id")} />

      <Label>Libro autor_id</Label>
      <div className="relative">
        <Input
          value={autorInput}
          onChange={(e) => {
            setAutorInput(e.target.value);
            setValue("autor_id", e.target.value);
          }}
          placeholder="Escribe un ID de autor..."
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg max-h-40 overflow-auto">
            {suggestions.map((autor) => (
              <li
                key={autor.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setAutorInput(autor.id);
                  setValue("autor_id", autor.id);
                  setSuggestions([]);
                  document.activeElement instanceof HTMLElement && document.activeElement.blur();
                }}
              >
                {autor.id} - {autor.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Label>titulo</Label>
      <Input {...register("titulo")} />

      <Label>isbn</Label>
      <Input {...register("isbn")} />

      <Label>Fecha de Publicación</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full justify-start text-left font-normal ${
              !date ? "text-muted-foreground" : ""
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy-MM-dd") : "Selecciona una fecha"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setValue(
                  "fecha_de_publicacion",
                  selectedDate?.toISOString().split("T")[0] || ""
                );
              }}
              initialFocus
            />
        </PopoverContent>
      </Popover>

      <Label>editorial</Label>
      {/*<Input {...register("editorial")} />*/}
        <div className="relative">
          <Input
            value={editorialInput}
            onChange={(e) => {
              setEditorialInput(e.target.value);
              setValue("editorial", e.target.value);
            }}
            placeholder="Escribe una editorial..."
          />
          {suggestions2.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg max-h-40 overflow-auto">
              {suggestions2.map((editorial) => (
                <li
                  key={editorial}
                  onClick={() => {
                    setEditorialInput(editorial);
                    setValue("editorial", editorial);
                    setSuggestions2([]);
                    document.activeElement instanceof HTMLElement && document.activeElement.blur();
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {editorial}
                </li>
              ))}
            </ul>
          )}
        </div>

      <Label>numero_de_paginas</Label>
      <Input {...register("numero_de_paginas")} />

      <Label>serie</Label>
      {/*<Input {...register("serie")} />*/}
        <div className="relative">
            <Input
              value={serieInput}
              onChange={(e) => {
                setSerieInput(e.target.value);
                setValue("serie", e.target.value);
              }}
              placeholder="Escribe una serie..."
            />
            {suggestions3.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg max-h-40 overflow-auto">
                {suggestions3.map((serie) => (
                  <li
                    key={serie}
                    onClick={() => {
                      setSerieInput(serie);
                      setValue("serie", serie);
                      setSuggestions3([]);
                      document.activeElement instanceof HTMLElement && document.activeElement.blur();
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {serie}
                  </li>
                ))}
              </ul>
            )}
          </div>

      <Label>clasificacion</Label>
      <Select
        value={clasificacionValue}
        onValueChange={(value) => setValue("clasificacion", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una clasificación" />
        </SelectTrigger>
        <SelectContent>
          {clasificaciones.map((clase) => (
            <SelectItem key={clase} value={clase}>
              {clase}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>estado</Label>
      <Select
        value={EstadoValue}
        onValueChange={(value) => setValue("estado", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un estado" />
        </SelectTrigger>
        <SelectContent>
          {Estados.map((clase) => (
            <SelectItem key={clase} value={clase}>
              {clase}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>situacion</Label>
      <Select
        value={SituacionValue}
        onValueChange={(value) => setValue("situacion", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una situacion" />
        </SelectTrigger>
        <SelectContent>
          {Situaciones.map((clase) => (
            <SelectItem key={clase} value={clase}>
              {clase}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>portada</Label>
      <Input {...register("portada")} />

      <Button>
        {
          params.id ? 'Update Product' : 'Create Product'
        }
      </Button>
    </form>
  );
}