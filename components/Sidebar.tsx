'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Menu, X, Moon, Sun } from 'lucide-react'
import { GradientText } from '@/components/GradientText'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Wellness Tracker', href: '/wellness-tracker' },
  { label: 'Nutrition & Workout', href: '/resources/nutrition-exercise' },
  { label: 'Mental Health', href: '/mental-health' },
  { label: 'Baby Care', href: '/baby-care' },
  { label: 'Community', href: '/community' },
  { label: 'Profile', href: '/profile' },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block w-64 h-screen">
        <SidebarContent pathname={pathname} setOpen={setOpen} />
      </div>
    </>
  )
}

function SidebarContent({ pathname, setOpen }: { pathname: string, setOpen: (open: boolean) => void }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="h-full flex flex-col bg-background border-r">
      <div className="p-4 border-b">
        <GradientText className="text-2xl font-bold">NestSenseAI</GradientText>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Dark Mode</span>
          {mounted && (
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

