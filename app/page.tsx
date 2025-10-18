'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  text: string
  votes: number
  timestamp: number
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [votedQuestions, setVotedQuestions] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Load voted questions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('votedQuestions')
    if (stored) {
      setVotedQuestions(new Set(JSON.parse(stored)))
    }
  }, [])

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions')
      if (response.ok) {
        const data = await response.json()
        setQuestions(data)
      }
    } catch (err) {
      console.error('Error fetching questions:', err)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newQuestion.trim()) {
      setError('Please enter a question')
      return
    }

    if (newQuestion.length < 10) {
      setError('Question must be at least 10 characters long')
      return
    }

    if (newQuestion.length > 500) {
      setError('Question must be less than 500 characters')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newQuestion }),
      })

      if (response.ok) {
        setNewQuestion('')
        await fetchQuestions()
      } else {
        setError('Failed to submit question')
      }
    } catch (err) {
      setError('Error submitting question')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVote = async (questionId: string) => {
    if (votedQuestions.has(questionId)) {
      return // Already voted
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId }),
      })

      if (response.ok) {
        const newVoted = new Set(votedQuestions)
        newVoted.add(questionId)
        setVotedQuestions(newVoted)
        localStorage.setItem('votedQuestions', JSON.stringify([...newVoted]))
        await fetchQuestions()
      }
    } catch (err) {
      console.error('Error voting:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Question Board
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Submit your questions and vote for the ones you want answered
          </p>
        </div>

        {/* Submit Question Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Submit a Question
          </h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What would you like to ask? (10-500 characters)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {newQuestion.length}/500
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Question'}
              </button>
            </div>
          </form>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Questions ({questions.length})
          </h2>
          {questions.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No questions yet. Be the first to ask!
              </p>
            </div>
          ) : (
            questions.map((question) => {
              const hasVoted = votedQuestions.has(question.id)
              return (
                <div
                  key={question.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex gap-4 hover:shadow-lg transition-shadow"
                >
                  {/* Vote Button */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => handleVote(question.id)}
                      disabled={hasVoted}
                      className={`p-2 rounded-lg transition-colors ${
                        hasVoted
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 cursor-default'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300'
                      }`}
                      title={hasVoted ? 'Already voted' : 'Upvote this question'}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {question.votes}
                    </span>
                  </div>

                  {/* Question Text */}
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
                      {question.text}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                      {new Date(question.timestamp).toLocaleDateString()} at{' '}
                      {new Date(question.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}

