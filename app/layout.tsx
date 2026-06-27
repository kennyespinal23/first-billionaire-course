import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The First Billionaire Course',
  description: 'Build the mind of a billionaire. From scratch.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-ink text-cream antialiased">
        {children}
      </body>
    </html>
  )
}
