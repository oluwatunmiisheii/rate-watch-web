import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const BASE_URL = process.env.API_BASE_URL

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const userId = searchParams.get('user_id')

  if (!userId || !email) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  let url = `${BASE_URL}/v1/users/delete?email=${email}&user_id=${userId}`

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const resp = await response.json()

    if (!response.ok) {
      return Response.json(resp, { status: response.status })
    }

    return Response.json(resp, { status: 200 })
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
