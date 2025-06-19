'use client'

import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/app/context/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface FormData {
  email: string
  password: string
  fullName: string
}

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const { registerUser } = useContext(AuthContext)
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    const { hasError, message } = await registerUser(data)

    if (hasError) {
      setErrorMessage(message)
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">Crear cuenta</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <div>
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input
                id="fullName"
                placeholder="Introduce tu nombre"
                {...register('fullName', { required: 'El nombre es obligatorio' })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                {...register('email', { required: 'El correo es obligatorio' })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Error general */}
            {errorMessage && (
              <p className="text-center text-sm text-red-600">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}