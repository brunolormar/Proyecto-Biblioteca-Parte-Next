"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import { createPrestamos } from "@/model/prestamos/dataprestamo";
import { updateLibroSituacion } from "@/model/libros/datalibro";

export default function PrestamoConfirmacionPage() {
  const router = useRouter();
  const params = useParams();
  const libroId = params.id as string;

  const [previousPath, setPreviousPath] = useState<string>("/public/libros")
  const { user } = useContext(AuthContext);

  // Capturar la ruta anterior cuando el componente se monta
  useEffect(() => {
    // Intentar obtener la URL anterior del historial de navegación
    if (window.history.length > 1) {
      // Almacenar la URL de referencia si existe
      const referrer = document.referrer
      if (referrer && referrer.includes(window.location.origin)) {
        setPreviousPath(new URL(referrer).pathname)
      }
    }
  }, [])

  // Función para manejar el botón "No" (volver atrás)
  const handleCancel = () => {
    // Intentar primero con router.back()
    try {
      router.back()

      // Como respaldo, si después de un breve tiempo seguimos en la misma página,
      // redirigir explícitamente a la ruta almacenada o a la página de libros
      setTimeout(() => {
        router.push(previousPath)
      }, 100)
    } catch (error) {
      // Si hay algún error, navegar directamente a la ruta almacenada
      router.push(previousPath)
    }
  }

  // Función para manejar el botón "Sí" (confirmar préstamo)
  const handleConfirm = async () => {
    if (!user) {
      alert("Debes estar logueado para tomar prestado un libro.");
      return;
    }

    if (!libroId) {
      console.error("ID del libro no disponible");
      return;
    }

    const fechaPrestamo = new Date();
    const fechaLimite = new Date(fechaPrestamo);
    fechaLimite.setDate(fechaPrestamo.getDate() + 7);

    const prestamo = {
      libro_id: Number(libroId),
      usuario_id: user.id,
      fecha_del_prestamo: fechaPrestamo.toISOString().split("T")[0], // formato yyyy-mm-dd
      fecha_limite_a_devolver: fechaLimite.toISOString().split("T")[0],
      estado_del_prestamo: "en curso",
    };

    try {
      console.log("ID del libro:", libroId);
      await createPrestamos(prestamo);
      await updateLibroSituacion(Number(libroId), "prestado");
    } catch (error) {
      console.error("Error al crear el préstamo:", error);
    }
    // Después de crear el prestamo, navegar de vuelta
    router.push(previousPath)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">¿Estás seguro de que quieres tomar prestado este libro?</h1>

        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={handleConfirm} className="bg-green-500 text-white px-8 py-2 rounded-md hover:bg-green-600">
            Sí
          </Button>

          <Button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-8 py-2 rounded-md hover:bg-gray-400">
            No
          </Button>
        </div>
      </div>
    </div>
  )
}