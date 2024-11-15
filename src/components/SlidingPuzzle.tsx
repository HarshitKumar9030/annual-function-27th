'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Timer, Shuffle } from 'lucide-react'

type Difficulty = 'easy' | 'medium' | 'hard'

const initialPuzzles = {
  easy: [1, 2, 3, 4, 5, 6, 7, 8, null],
  medium: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null],
  hard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, null]
}

const colors = [
  'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-red-400', 'bg-purple-400',
  'bg-pink-400', 'bg-indigo-400', 'bg-teal-400', 'bg-orange-400', 'bg-cyan-400'
]

export default function PlayfulSlidingPuzzle() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [puzzle, setPuzzle] = useState(initialPuzzles[difficulty])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const shufflePuzzle = useCallback(() => {
    const shuffled = [...initialPuzzles[difficulty]].sort(() => Math.random() - 0.5)
    setPuzzle(shuffled)
    setMoves(0)
    setTime(0)
    setIsRunning(true)
  }, [difficulty])

  useEffect(() => {
    shufflePuzzle()
  }, [difficulty, shufflePuzzle])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => setTime(prevTime => prevTime + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const handleTileClick = (index: number) => {
    const emptyIndex = puzzle.indexOf(null)
    const size = Math.sqrt(puzzle.length)
    if (
      (index === emptyIndex - 1 && emptyIndex % size !== 0) ||
      (index === emptyIndex + 1 && index % size !== 0) ||
      index === emptyIndex - size ||
      index === emptyIndex + size
    ) {
      const newPuzzle = [...puzzle]
      ;[newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]]
      setPuzzle(newPuzzle)
      setMoves(prevMoves => prevMoves + 1)
    }
  }

  const isPuzzleSolved = useCallback(() => {
    return puzzle.every((tile, index) => tile === initialPuzzles[difficulty][index])
  }, [puzzle, difficulty])

  useEffect(() => {
    if (isPuzzleSolved() && isRunning) {
      setIsRunning(false)
    }
  }, [isPuzzleSolved, isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white p-8 rounded-3xl w-full mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-purple-800 text-center">Sliding Puzzle</h2>
      <div className="mb-4">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="w-full p-2 rounded-lg bg-white text-purple-800 font-semibold border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="easy">Easy (3x3)</option>
          <option value="medium">Medium (4x4)</option>
          <option value="hard">Hard (5x5)</option>
        </select>
      </div>
      <div className={`grid gap-2 mb-6 ${
        difficulty === 'easy' ? 'grid-cols-3' : difficulty === 'medium' ? 'grid-cols-4' : 'grid-cols-5'
      }`}>
        {puzzle.map((tile, index) => (
          <motion.div
            key={tile}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg ${
              tile ? `${colors[tile % colors.length]} text-white cursor-pointer hover:brightness-110` : 'bg-transparent'
            } transition-all duration-300 ease-in-out shadow-md`}
            onClick={() => handleTileClick(index)}
            role="button"
            tabIndex={0}
            aria-label={tile ? `Tile ${tile}` : 'Empty tile'}
          >
            {tile}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4 text-purple-800 font-semibold">
        <div className="flex items-center">
          <Timer className="mr-2" />
          <span>{formatTime(time)}</span>
        </div>
        <div>
          Moves: {moves}
        </div>
      </div>
      {isPuzzleSolved() && (
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 font-bold mb-4 text-center text-2xl"
        >
          🎉 Congratulations! You solved the puzzle! 🎉
        </motion.p>
      )}
      <button
        onClick={shufflePuzzle}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
      >
        <Shuffle className="mr-2" /> Shuffle Puzzle
      </button>
    </div>
  )
}