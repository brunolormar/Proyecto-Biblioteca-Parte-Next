"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "../component/overview"
import { RecentActivity } from "../component/recent-activity"
import { BookOpenText, Users, BookCopy, UserRound } from "lucide-react"
import { getLibros } from "@/model/libros/datalibro" 
import { getUsuarios } from "@/model/usuarios/datausuario"
import { getPrestamos } from "@/model/prestamos/dataprestamo"

export default function Dashboard() {
  const [totalLibros, setTotalLibros] = useState<number>(0)
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0)
  const [totalPrestamos, setTotalPrestamos] = useState<number>(0)

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const libros = await getLibros()
        setTotalLibros(libros.length) // contar libros recibidos
      } catch (error) {
        console.error("Error al obtener libros:", error)
      }
    }
    fetchLibros()

    const fetchUsuarios = async () => {
      try {
        const usuarios = await getUsuarios()
        setTotalUsuarios(usuarios.length)
      } catch (error) {
        console.error("Error al obtener usuarios:", error)
      }
    }
    fetchUsuarios()

    const fetchPrestamos = async () => {
      try {
        const prestamos = await getPrestamos()
        setTotalPrestamos(prestamos.length)
      } catch (error) {
        console.error("Error al obtener prestamos:", error)
      }
    }
    fetchPrestamos()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Panel de Control</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Libros</CardTitle>
            <BookOpenText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLibros}</div>
            <p className="text-xs text-muted-foreground">+12 en el último mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Préstamos Activos</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrestamos}</div>
            <p className="text-xs text-muted-foreground">+4 desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios del Sistema</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsuarios}</div>
            <p className="text-xs text-muted-foreground">+2 en el último mes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Actividad de Préstamos</CardTitle>
            <CardDescription>Préstamos mensuales durante el último año</CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
