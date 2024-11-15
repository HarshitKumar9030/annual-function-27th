'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Trophy, Music, PartyPopper } from 'lucide-react'

export default function PlayfulHeader() {
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPartyMode, setIsPartyMode] = useState(false)

  useEffect(() => {
    const storedScore = localStorage.getItem('mathScore')
    if (storedScore) {
      setScore(parseInt(storedScore, 10))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mathScore', score.toString())
  }, [score])

  const handleScoreIncrease = () => {
    setScore(prevScore => prevScore + 1)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const togglePartyMode = () => {
    setIsPartyMode(prev => !prev)
  }

  return (
    <Card className={`w-full border-none max-w-4xl mx-auto mb-12 overflow-hidden transition-colors duration-500 ${isPartyMode ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500' : ''}`}>
      <CardHeader>
        <CardTitle>
          <motion.h1 
            className={`text-4xl font-bold text-center ${isPartyMode ? 'text-white' : 'text-primary'}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Celebrating UCSKM&apos;s 27th Annual Function
          </motion.h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
            >
              <Trophy className={`h-8 w-8 ${isPartyMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
            </motion.div>
            <p className={`text-xl font-semibold ${isPartyMode ? 'text-white' : ''}`}>
              Total Score: <Badge className="text-2xl rounded-full ml-2">{score}</Badge>
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleScoreIncrease} variant={isPartyMode ? "secondary" : "default"} className="group">
              <Sparkles className="mr-2 h-4 w-4 group-hover:animate-spin" />
              Increase Score
            </Button>
            <Button onClick={togglePartyMode} variant={isPartyMode ? "secondary" : "outline"} className="group">
              {isPartyMode ? <Music className="mr-2 h-4 w-4" /> : <PartyPopper className="mr-2 h-4 w-4" />}
              {isPartyMode ? 'Calm Mode' : 'Party Mode'}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {isPartyMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <p className="text-white text-center text-lg">🎉 Let&apos;s celebrate! 🎉</p>
            </motion.div>
          )}
        </AnimatePresence>
        {showConfetti && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, index) => (
              <motion.div
                key={index}
                className={`absolute w-3 h-3 ${index % 2 === 0 ? 'bg-yellow-400' : 'bg-pink-400'} rounded-full`}
                initial={{
                  x: '50%',
                  y: '50%',
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [1, 1.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}