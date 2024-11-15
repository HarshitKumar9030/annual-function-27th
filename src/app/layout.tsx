import type { Metadata } from "next"
import { Fredoka } from "next/font/google"
import "./globals.css"

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "UCSKM's 27th Annual Celebration",
  description: "Join us for an exciting celebration of mathematics and creativity at UCSKM Public School's 27th Annual Function!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${fredoka.className}`}>
      <body className="--font-fredoka antialiased min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
        {children}
      </body>
    </html>
  )
}