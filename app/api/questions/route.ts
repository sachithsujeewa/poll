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

// Ensure data directory and file exist
async function ensureDataFile() {
  try {
    const dir = path.dirname(DATA_FILE)
    await fs.mkdir(dir, { recursive: true })
    
    try {
      await fs.access(DATA_FILE)
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(DATA_FILE, JSON.stringify([]))
    }
  } catch (error) {
    console.error('Error ensuring data file:', error)
  }
}

// Read questions from file
async function readQuestions(): Promise<Question[]> {
  try {
    await ensureDataFile()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const questions = JSON.parse(data)
    // Sort by votes (descending) and then by timestamp (newest first)
    return questions.sort((a: Question, b: Question) => {
      if (b.votes !== a.votes) {
        return b.votes - a.votes
      }
      return b.timestamp - a.timestamp
    })
  } catch (error) {
    console.error('Error reading questions:', error)
    return []
  }
}

// Write questions to file
async function writeQuestions(questions: Question[]) {
  try {
    await ensureDataFile()
    await fs.writeFile(DATA_FILE, JSON.stringify(questions, null, 2))
  } catch (error) {
    console.error('Error writing questions:', error)
    throw error
  }
}

// GET: Fetch all questions
export async function GET() {
  try {
    const questions = await readQuestions()
    return NextResponse.json(questions)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}

// POST: Submit a new question
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid question text' },
        { status: 400 }
      )
    }

    const trimmedText = text.trim()

    if (trimmedText.length < 10) {
      return NextResponse.json(
        { error: 'Question must be at least 10 characters' },
        { status: 400 }
      )
    }

    if (trimmedText.length > 500) {
      return NextResponse.json(
        { error: 'Question must be less than 500 characters' },
        { status: 400 }
      )
    }

    const questions = await readQuestions()

    const newQuestion: Question = {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: trimmedText,
      votes: 0,
      timestamp: Date.now(),
    }

    questions.push(newQuestion)
    await writeQuestions(questions)

    return NextResponse.json(newQuestion, { status: 201 })
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
}

