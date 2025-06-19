"use client"

import { useState, useEffect } from "react"
import { Users, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IAutor } from "@/interfaces/IAutores"
import { getAutores } from "@/model/autores/dataautor"

export default function AutoresPage() {
  const [autores, setAutores] = useState<IAutor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAutores();
  }, []);

  async function fetchAutores() {
    setLoading(true);
    setError(null);
    try {
      const res = await getAutores();
      setAutores(res);
    } catch (error) {
      setError("Error al obtener los autores");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando autores...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={getAutores} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Autores</h1>
          <p className="text-muted-foreground">Lista de autores de la biblioteca</p>
        </div>
      </div>

      {/* Stats */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{autores.length}</p>
              <p className="text-muted-foreground">
                {autores.length === 1 ? "Autor registrado" : "Autores registrados"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Autores */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Autores</CardTitle>
          <CardDescription>Todos los autores registrados en la biblioteca</CardDescription>
        </CardHeader>
        <CardContent>
          {autores.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay autores registrados</h3>
              <p className="text-muted-foreground">No se encontraron autores en la base de datos</p>
            </div>
          ) : (
            <div className="space-y-2">
              {autores.map((autor, index) => (
                <div
                  key={autor.codigo_de_autor}
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{autor.nombre}</p>
                    {/*<p className="text-sm text-muted-foreground">ID: {autor.codigo_de_autor}</p>*/}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
