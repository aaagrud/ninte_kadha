import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DataProvider } from "@/context/DataContext";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ninte Kadha - Your Story from Search History",
  description: "Turn your search history into a beautiful, personalized story",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><DataProvider>{children}</DataProvider></body>
    </html>
  )
}



import './globals.css'