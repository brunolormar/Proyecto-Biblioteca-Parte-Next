"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpenText, Users, BookCopy, UserRound, LayoutDashboard, Menu, UserCircle, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Panel",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Libros",
    href: "/admin/dashboard/libros",
    icon: <BookOpenText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Autores",
    href: "/admin/dashboard/autores",
    icon: <UserCircle className="mr-2 h-4 w-4" />,
  },
  {
    title: "Préstamos",
    href: "/admin/dashboard/prestamos",
    icon: <BookCopy className="mr-2 h-4 w-4" />,
  },
  {
    title: "Usuarios",
    href: "/admin/dashboard/usuarios",
    icon: <UserRound className="mr-2 h-4 w-4" />,
  },
  {
    title: "Configuración",
    href: "/admin/dashboard/configuracion",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileSidebar pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-background md:block">
        <div className="h-screen w-64">
          <DesktopSidebar pathname={pathname} />
        </div>
      </div>
    </>
  )
}

function MobileSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpenText className="h-6 w-6" />
          <span>Biblioteca Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 p-3">
        <nav className="grid gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpenText className="h-6 w-6" />
          <span>Biblioteca Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 p-3">
        <nav className="grid gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
