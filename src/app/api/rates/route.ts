const BASE_URL = process.env.API_BASE_URL
import { auth } from '@clerk/nextjs/server'

export async function GET(request: Request) {
  auth().protect()
  const { searchParams } = new URL(request.url)
  const sourceCurrency = searchParams.get('sourceCurrency')
  const targetCurrency = searchParams.get('targetCurrency')

  if (!sourceCurrency || !targetCurrency) {
    return Response.json({ message: 'Invalid Request' }, { status: 400 })
  }

  let url = `${BASE_URL}/v1/rates?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}`

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
