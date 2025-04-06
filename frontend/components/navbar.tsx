"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { History, Home } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-green-600 dark:text-green-400">
          Cache
        </Link>

        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button variant={pathname === "/" ? "default" : "ghost"} size="sm">
              <Home className="h-4 w-4 mr-2" />
              Estimator
            </Button>
          </Link>

          <Link href="/history">
            <Button variant={pathname === "/history" ? "default" : "ghost"} size="sm">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </Link>

          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

