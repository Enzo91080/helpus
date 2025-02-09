"use server";

import { Donation } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { IBeneficiary } from "@/types/IBeneficiary";
import { Beneficiary } from "../models/beneficiary.model";

export async function getBeneficiaries(): Promise<IBeneficiary[]> {
  await connectDB();

  try {
    const beneficiaries: IBeneficiary[] = await Beneficiary.find();
    return beneficiaries;
  } catch (error) {
    console.error("Erreur lors de la récupération des beneficiaries :", error);
    return [];
  }
}

export async function getBeneficiaryById(id: string): Promise<IBeneficiary | null> {
  await connectDB();

  try {
    const beneficiary: IBeneficiary | null = await Donation.findById(id);
    return beneficiary;
  } catch (error) {
    console.error("Erreur lors de la récupération du beneficiary :", error);
    return null;
  }
}

export async function createBeneficiary(beneficiary: IBeneficiary): Promise<IBeneficiary> {
  await connectDB();
  try {
    const newBeneficiary: IBeneficiary = await Beneficiary.create(beneficiary);
    return newBeneficiary;
  } catch (error) {
    console.error("Erreur lors de la création du beneficiary :", error);
    return beneficiary;
  }
}
