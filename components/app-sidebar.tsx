"use client"

import { useEffect } from "react";
import { ClipboardList, Boxes, User2, ChevronUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useAppStore } from "@/store"

// Menu items.
const items = [
  {
    title: "Products",
    url: "/dashboard/product",
    icon: Boxes,
  },
  {
    title: "Adjustment Transactions",
    url: "/dashboard/transaction",
    icon: ClipboardList,
  },
]

export function AppSidebar() {

    const toggleAuth = useAppStore((state) => state.toggleAuth);

    const router = useRouter()
    const isAuthenticated = useAppStore((state) => state.authenticated)
    
    useEffect(() => {
        if(!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    
  return (
    <Sidebar>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Admin
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem className="z-10 bg-white border-2 mt-4 border-black cursor-pointer text-center">
                    <span onClick={toggleAuth}>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}