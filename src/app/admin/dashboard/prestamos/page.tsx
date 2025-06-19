'use client';

import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPrestamos } from "@/model/prestamos/dataprestamo";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PrestamoAcciones } from "./PrestamoAcciones";
import PrestamoBusqueda from "./PrestamosBusqueda";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function PrestamosPageWrapper() {
  const [prestamos, setPrestamos] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPrestamos();
      setPrestamos(data);
    };
    fetchData();
  }, []);

  const prestamosFiltrados = prestamos.filter((prestamo) =>
    prestamo.libro_id.toString().includes(filtro.trim())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Préstamos</h1>
        <Link href="/admin/dashboard/prestamos/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Préstamo
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <PrestamoBusqueda onBuscar={(valor) => setFiltro(valor)} />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>libro id</TableHead>
              <TableHead>usuario id</TableHead>
              <TableHead>fecha del prestamo</TableHead>
              <TableHead>fecha limite a devolver</TableHead>
              <TableHead>estado del prestamo</TableHead>
              <TableHead>acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prestamosFiltrados.map((prestamo) => (
              <TableRow
                key={`${prestamo.libro_id}-${prestamo.usuario_id}-${prestamo.fecha_del_prestamo}`}
              >
                <TableCell>{prestamo.libro_id}</TableCell>
                <TableCell>{prestamo.usuario?.username}</TableCell>
                <TableCell>{prestamo.fecha_del_prestamo}</TableCell>
                <TableCell>{prestamo.fecha_limite_a_devolver}</TableCell>
                <TableCell>{prestamo.estado_del_prestamo}</TableCell>
                <TableCell>
                  <PrestamoAcciones
                    libro_id={prestamo.libro_id}
                    usuario_id={prestamo.usuario_id}
                    fecha_del_prestamo={prestamo.fecha_del_prestamo}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}