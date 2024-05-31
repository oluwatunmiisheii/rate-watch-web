const BASE_URL = process.env.API_BASE_URL
import { auth } from '@clerk/nextjs/server'

export async function GET(request: Request) {
  auth().protect()
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return new Response(null, {
      status: 400,
      statusText: 'Bad Request',
    })
  }

  let url = `${BASE_URL}/v1/rate-watch?email=${email}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    return new Response(null, {
      status: response?.status || 500,
      statusText: response?.statusText || 'Internal Server Error',
    })
  }

  const data = await response.json()
  return Response.json(data)
}

export async function POST(req: Request) {
  auth().protect()
  const body = await req.json()
  let url = `${BASE_URL}/rate-alerts`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return new Response(null, {
      status: response?.status || 500,
      statusText: response?.statusText || 'Internal Server Error',
    })
  }

  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}
