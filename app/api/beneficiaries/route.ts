import { Beneficiary } from "@/lib/models/beneficiary.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const beneficiaries = await Beneficiary.find().lean(); // 🔥 Convertit les docs en objets JS purs
    return NextResponse.json(beneficiaries);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des dons." },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const beneficiary = new Beneficiary(body);
    console.log(beneficiary);
    await beneficiary.save();
    return NextResponse.json(beneficiary);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de la beneficiary." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const id = params.id;
    const body = await req.json();
    const beneficiary = await Beneficiary.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(beneficiary);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la modification de la beneficiary." }, { status: 500 });
  }
}

