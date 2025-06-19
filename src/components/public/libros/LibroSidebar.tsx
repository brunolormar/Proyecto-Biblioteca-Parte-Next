"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import axios from "axios"

type Icat = {
  clasificacion: string;
}
type Icat2 = {
  codigo_de_autor: string;
  nombre: string;
}

interface SidebarProps {
  isOpen: boolean;
  onCategoriaChange: (categoria: string) => void;
  onAutorChange: (autorId: string) => void;
}

export function Sidebar({ isOpen, onCategoriaChange, onAutorChange}: SidebarProps) {
  const [category, setCategory] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [isAvailable, setIsAvailable] = useState(false)
  const  [categorias, setCategorias ] = useState<Icat[]>([{clasificacion:"Nosepuededejarvacio"}]);
  const [autor, setAutor] = useState<Icat2[]>([]);

  useEffect(() => {
    const getclasificacion = async () => { 
      try {
        const res = await axios.get("http://localhost:3000/api/libros/categoria");
        setCategorias(res.data)
        console.log(res.data);
        // return res; // Axios devuelve la respuesta en `data` automáticamente
      } catch (error) {
          throw new Error("Failed to fetch data");
      }

    }
    getclasificacion()

    const getNombreautor = async () => { 
      try {
        const res = await axios.get("http://localhost:3000/api/libros/Filtronombre");

        /*const adaptado = res.data.map((autor: { id_autor: string }) => ({
          autor_id: autor.id_autor,
        }));*/

        setAutor(res.data)
        console.log(res.data);
        // return res; // Axios devuelve la respuesta en `data` automáticamente
      } catch (error) {
          throw new Error("Failed to fetch data");
      }

    }
    getNombreautor()

  }, []);

  return (
    <Card
      className={`w-64 fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 pt-16`}
    >
      <CardHeader className="p-4">
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-[calc(100%-60px)] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            {/*<Select onValueChange={setCategory} value={category}>*/}
            <Select onValueChange={(value) => {
              setCategory(value);
              onCategoriaChange(value); // <-- esto comunica al padre
            }} value={category}>
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat.clasificacion} value={cat.clasificacion}>
                    {cat.clasificacion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="author-select" className="block text-sm font-medium text-gray-700 mb-1">
              Autor
            </label>
            {/*<Select onValueChange={setAuthor} value={author}>*/}
            <Select onValueChange={(value) => {
              setAuthor(value);
              onAutorChange(value); // <-- esto comunica al padre
              console.log("Autor seleccionado (id):", value)
            }} value={author}>
              <SelectTrigger id="author-select">
                <SelectValue placeholder="Selecciona un autor">
                  {autor.find((a) => a.codigo_de_autor === author)?.nombre ?? ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {autor.map((autor) => (
                  <SelectItem key={autor.codigo_de_autor} value={autor.codigo_de_autor}>
                    {autor.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="availability"
              checked={isAvailable}
              onCheckedChange={(checked) => setIsAvailable(checked as boolean)}
            />
            <Label
              htmlFor="availability"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mostrar solo libros disponibles
            </Label>
          </div>
          <h2>Si el libro esta libre para tomar prestado se mostrara un boton verde que pone "libre", pinchar en el boton para tomar prestado el libro.</h2>
        </div>
      </CardContent>
    </Card>
  )
}

