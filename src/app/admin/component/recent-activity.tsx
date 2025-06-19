import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: {
      name: "Ana Martínez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AM",
    },
    action: "ha devuelto",
    item: "Cien años de soledad",
    time: "hace 10 minutos",
  },
  {
    user: {
      name: "Carlos López",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CL",
    },
    action: "ha tomado prestado",
    item: "Harry Potter y la piedra filosofal",
    time: "hace 30 minutos",
  },
  {
    user: {
      name: "Admin Principal",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AP",
    },
    action: "ha añadido un nuevo libro",
    item: "La sombra del viento",
    time: "hace 1 hora",
  },
  {
    user: {
      name: "María Rodríguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MR",
    },
    action: "ha renovado el préstamo de",
    item: "El código Da Vinci",
    time: "hace 2 horas",
  },
  {
    user: {
      name: "Elena García",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EG",
    },
    action: "ha registrado un nuevo socio",
    item: "Pedro Gómez",
    time: "hace 3 horas",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-semibold">{activity.item}</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}