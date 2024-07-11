import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log('api jalan')
  const data = [
    { username: 'fauzi' },
    { username: 'iqbal' }
  ]

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const data = [
    { username: 'fauzi' },
    { username: 'iqbal' }
  ]

  return NextResponse.json(data)
}