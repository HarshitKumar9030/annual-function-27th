'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const funFacts = [
  "A 'jiffy' is an actual unit of time: 1/100th of a second.",
  "The symbol for division (÷) is called an obelus.",
  "The number 4 is the only number spelled with the same number of letters as itself.",
  "In a room of just 23 people, there's a 50% chance that two people have the same birthday.",
  "The word 'hundred' comes from the Old Norse word 'hundrath', which actually means 120, not 100.",
  "The infinity symbol (∞) is called a lemniscate.",
  "Zero is the only number that cannot be represented by Roman numerals.",
  "'Forty' is the only number that is spelled with letters arranged in alphabetical order.",
  "The number 1 followed by 100 zeros is called a 'googol'.",
  "There are 177,147 ways to tie a tie, according to mathematicians.",
  "The shortest mathematical proof is only two words: 'Theorem: All numbers are interesting. Proof: Assume the contrary.'",
  "The sum of all numbers on a roulette wheel is 666.",
  "If you shuffle a deck of cards properly, it's likely that your exact order has never been seen before in human history.",
  "The word 'mathematics' only appears in one Shakespearean play, 'The Taming of the Shrew'.",
  "A 'perfect number' is one whose divisors (excluding itself) sum to itself. 6 is the first perfect number: 1 + 2 + 3 = 6.",
]

export default function EnhancedFunFact() {
  const [factIndex, setFactIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isAutoPlay) {
      timer = setInterval(() => {
        setFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length)
      }, 10000)
    }
    return () => clearInterval(timer)
  }, [isAutoPlay])

  const handlePrevFact = () => {
    setFactIndex((prevIndex) => (prevIndex - 1 + funFacts.length) % funFacts.length)
    setIsAutoPlay(false)
  }

  const handleNextFact = () => {
    setFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length)
    setIsAutoPlay(false)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay((prev) => !prev)
  }

  return (
    <Card className="w-full max-w-2xl my-12 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Math Fun Fact</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={factIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-[100px] flex items-center justify-center text-center mb-4"
          >
            <p className="text-lg">{funFacts[factIndex]}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="icon" onClick={handlePrevFact} aria-label="Previous fact">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={toggleAutoPlay}>
            {isAutoPlay ? 'Pause' : 'Auto Play'}
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextFact} aria-label="Next fact">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}