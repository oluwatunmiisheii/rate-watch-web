import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    await clerkClient.users.deleteUser(userId)
    return NextResponse.json({ message: 'User deleted' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error deleting user' })
  }
}
