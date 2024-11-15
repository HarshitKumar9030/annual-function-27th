import Header from '@/components/Header'
import FunFact from '@/components/FunFact'
import StickPuzzle from '@/components/StickPuzzle'
import SlidingPuzzle from '@/components/SlidingPuzzle'
import MathChallenge from '@/components/MathChallenge'
import FeaturedProjects from '@/components/FeaturedProjects'
import MathInDailyLife from '@/components/MathInDailyLife'
import Invitation from '@/components/Invitation'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 text-gray-800 p-8">
      <Header />
      <main className="max-w-4xl mx-auto">
        <FunFact />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <StickPuzzle />
          <SlidingPuzzle />
        </div>
        <MathChallenge />
        <FeaturedProjects />
        <MathInDailyLife />
        <Invitation />
      </main>
      <footer className="mt-12 text-center text-sm text-gray-600">
        © 2024 <Link href="https://www.leoncyriac.me?ref=ucskm.leoncyriac.me">Harshit</Link></footer>
    </div>
  )
}