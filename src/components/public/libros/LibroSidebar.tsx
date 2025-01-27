"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const categories = ["Ficción", "No ficción", "Ciencia", "Historia", "Biografía"]
const authors = [
  "Gabriel García Márquez",
  "Isabel Allende",
  "Jorge Luis Borges",
  "Mario Vargas Llosa",
  "Julio Cortázar",
]

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const [category, setCategory] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [isAvailable, setIsAvailable] = useState(false)

  return (
    <Card
      className={`w-64 fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 pt-16`}
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
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="author-select" className="block text-sm font-medium text-gray-700 mb-1">
              Autor
            </label>
            <Select onValueChange={setAuthor} value={author}>
              <SelectTrigger id="author-select">
                <SelectValue placeholder="Selecciona un autor" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((auth) => (
                  <SelectItem key={auth} value={auth}>
                    {auth}
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
        </div>
      </CardContent>
    </Card>
  )
}