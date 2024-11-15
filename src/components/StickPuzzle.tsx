'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StickPuzzle() {
  const [sticks, setSticks] = useState(Array(12).fill(true))
  const [removedSticks, setRemovedSticks] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [isWon, setIsWon] = useState(false)

  useEffect(() => {
    checkWinCondition()
  }, [sticks])

  const handleStickClick = (index: number) => {
    if (removedSticks < 2 && sticks[index] && !isWon) {
      setSticks(prevSticks => {
        const newSticks = [...prevSticks]
        newSticks[index] = false
        return newSticks
      })
      setRemovedSticks(prev => prev + 1)
    }
  }

  const resetPuzzle = () => {
    setSticks(Array(12).fill(true))
    setRemovedSticks(0)
    setShowSolution(false)
    setIsWon(false)
  }

  const toggleSolution = () => setShowSolution(prev => !prev)

  const checkWinCondition = () => {
    const winningCombinations = [
      [0, 1, 3, 4],
      [1, 2, 4, 5],
      [3, 4, 6, 7],
      [4, 5, 7, 8],
      [6, 7, 9, 10],
    ]

    const remainingSquares = winningCombinations.filter(combo =>
      combo.every(index => sticks[index])
    )

    setIsWon(remainingSquares.length === 5 && removedSticks === 2)
  }

  const renderStick = (index: number, isInSolution: boolean = false) => (
    <motion.div
      key={index}
      className={`h-16 ${
        sticks[index] ? 'bg-primary' : 'bg-transparent'
      } ${
        (index + 1) % 3 === 0 ? 'col-span-1' : 'col-span-2'
      } cursor-pointer relative`}
      onClick={() => handleStickClick(index)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={sticks[index] ? { opacity: 1 } : { opacity: 0.3 }}
      transition={{ duration: 0.3 }}
    >
      {isInSolution && !sticks[index] && (
        <motion.div
          className="absolute inset-0 bg-destructive opacity-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
    </motion.div>
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Stick Puzzle Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">Make 5 squares by removing 2 sticks!</p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {sticks.map((_, index) => renderStick(index, showSolution && (index === 2 || index === 9)))}
        </div>
        <div className="flex space-x-4 mb-4">
          <Button variant="destructive" onClick={resetPuzzle}>
            Reset Puzzle
          </Button>
          <Button variant="secondary" onClick={toggleSolution}>
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </Button>
        </div>
        <AnimatePresence>
          {showSolution && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 bg-muted p-4 rounded-lg"
            >
              <p className="mb-2 text-muted-foreground">Solution: Remove the two sticks that form the middle line of the top-right and bottom-left squares.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-green-100 dark:bg-green-900 border-2 border-green-500 p-4 rounded-lg text-green-700 dark:text-green-300 font-bold text-center"
            >
              Congratulations! You solved the puzzle!
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}