'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

const operators = ['+', '-', '*']

export default function EnhancedMathChallenge() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operator, setOperator] = useState('+')
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isGameOver, setIsGameOver] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mathFact, setMathFact] = useState('')
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    generateQuestion()
    startTimer()
    fetchMathFact()
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      endGame()
    }
  }, [timeLeft])

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }

  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1
    const newNum2 = Math.floor(Math.random() * 10) + 1
    const newOperator = operators[Math.floor(Math.random() * operators.length)]
    setNum1(newNum1)
    setNum2(newNum2)
    setOperator(newOperator)
    setAnswer('')
  }

  const checkAnswer = () => {
    let correctAnswer
    switch (operator) {
      case '+':
        correctAnswer = num1 + num2
        break
      case '-':
        correctAnswer = num1 - num2
        break
      case '*':
        correctAnswer = num1 * num2
        break
      default:
        correctAnswer = 0
    }

    const isCorrect = parseInt(answer, 10) === correctAnswer
    setLastAnswerCorrect(isCorrect)

    if (isCorrect) {
      setScore(score + 1)
      generateQuestion()
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      setScore(Math.max(0, score - 1))
    }

    setTimeout(() => setLastAnswerCorrect(null), 2000)
  }

  const endGame = () => {
    setIsGameOver(true)
  }

  const restartGame = () => {
    setTimeLeft(60)
    setScore(0)
    setIsGameOver(false)
    generateQuestion()
    startTimer()
    fetchMathFact()
  }

  const fetchMathFact = async () => {
    try {
      const response = await fetch('https://numbersapi.p.rapidapi.com/random/math?json=true', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
          'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
      })
      const data = await response.json()
      setMathFact(data.text)
    } catch (error) {
      console.error('Error fetching math fact:', error)
      setMathFact('Did you know? Mathematics is awesome!')
    }
  }

  return (
    <Card className="w-full max-w-2xl my-12 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Math Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <span>Time left: {timeLeft} seconds</span>
          <span>Score: {score}</span>
        </div>
        <Progress value={(timeLeft / 60) * 100} className="mb-4" />
        {!isGameOver ? (
          <>
            <motion.div
              key={`${num1}${operator}${num2}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl mb-4 text-center"
            >
              {num1} {operator} {num2} = ?
            </motion.div>
            <div className="flex space-x-2 mb-4">
              <Input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
                className="text-lg"
              />
              <Button onClick={checkAnswer} size="lg">
                Submit
              </Button>
            </div>
            <AnimatePresence>
              {lastAnswerCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center ${
                    lastAnswerCorrect ? 'text-green-500' : 'text-red-500'
                  } mb-4`}
                >
                  {lastAnswerCorrect ? (
                    <CheckCircle className="mr-2" />
                  ) : (
                    <AlertCircle className="mr-2" />
                  )}
                  {lastAnswerCorrect ? 'Correct!' : 'Incorrect. Try again!'}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
            <p className="text-xl mb-4">Your final score is {score}</p>
            <Button onClick={restartGame} size="lg">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}