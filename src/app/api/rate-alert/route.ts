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

  let url = `${BASE_URL}/v1/rate-alerts?email=${email}`

  try {
    const response = await fetch(url, {
      method: 'GET',
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

export async function POST(req: Request) {
  auth().protect()
  const body = await req.json()

  let url = `${BASE_URL}/v1/rate-alerts`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        types: body.alertTypes,
        source_currency: body.sourceCurrency,
        target_currency: body.targetCurrency,
        target_amount: body.targetAmount,
      }),
    })

    const res = await response.json()

    if (!response.ok) {
      return Response.json(res, { status: response.status })
    }

    return Response.json(res, { status: 201 })
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  auth().protect()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    Response.json({ message: 'Bad Request' }, { status: 400 })
  }

  let url = `${BASE_URL}/v1/rate-alerts/${id}`

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
