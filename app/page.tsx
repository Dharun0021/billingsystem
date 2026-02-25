"use client"

import { AppProvider } from "@/lib/store"
import { AppShell } from "@/components/restaurant/app-shell"

export default function Home() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
