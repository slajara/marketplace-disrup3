import Hero from '@/components/Hero'
import MainLayout from '@/components/layouts/MainLayout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout>
     <Hero />
    </MainLayout>
  )
}
