"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Ene",
    total: 120,
  },
  {
    name: "Feb",
    total: 132,
  },
  {
    name: "Mar",
    total: 101,
  },
  {
    name: "Abr",
    total: 134,
  },
  {
    name: "May",
    total: 90,
  },
  {
    name: "Jun",
    total: 72,
  },
  {
    name: "Jul",
    total: 106,
  },
  {
    name: "Ago",
    total: 119,
  },
  {
    name: "Sep",
    total: 108,
  },
  {
    name: "Oct",
    total: 143,
  },
  {
    name: "Nov",
    total: 129,
  },
  {
    name: "Dic",
    total: 145,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="#16a34a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
