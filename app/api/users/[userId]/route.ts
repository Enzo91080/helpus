import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Donor } from '@/lib/models/donors.model';
import { Beneficiary } from '@/lib/models/beneficiary.model';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    // Try to find user in Donor collection
    let user = await Donor.findById(params.userId).select('_id name image');

    // If not found in Donor, try Beneficiary collection
    if (!user) {
      user = await Beneficiary.findById(params.userId).select('_id name image');
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _id: user._id.toString(),
      name: user.name,
      image: user.image || undefined
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Error fetching user' },
      { status: 500 }
    );
  }
} 