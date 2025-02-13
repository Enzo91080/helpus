// app/api/user/authorize/route.ts
import { NextResponse, NextRequest } from 'next/server'
import mongoose from 'mongoose'
import User from '@/lib/models/user.model'
import connectDB from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Get the user ID from URL parameters
    const id = request.nextUrl.pathname.split('/').pop()

    
    // Update the user's role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: 'admin' },
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }

    // Disconnect
    await mongoose.disconnect()

    return NextResponse.redirect(new URL('/signin', request.url))

  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour du rôle" },
      { status: 500 }
    )
  }
}