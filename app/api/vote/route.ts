import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'questions.json')

interface Question {
  id: string
  text: string
  votes: number
  timestamp: number
}

// Read questions from file
async function readQuestions(): Promise<Question[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading questions:', error)
    return []
  }
}

// Write questions to file
async function writeQuestions(questions: Question[]) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(questions, null, 2))
  } catch (error) {
    console.error('Error writing questions:', error)
    throw error
  }
}

// POST: Upvote a question
export async function POST(request: NextRequest) {
  try {
    const { questionId } = await request.json()

    if (!questionId) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      )
    }

    const questions = await readQuestions()
    const questionIndex = questions.findIndex((q) => q.id === questionId)

    if (questionIndex === -1) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      )
    }

    questions[questionIndex].votes += 1
    await writeQuestions(questions)

    return NextResponse.json(questions[questionIndex])
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    )
  }
}

