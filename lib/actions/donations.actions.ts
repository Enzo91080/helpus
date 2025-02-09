"use server";

import { Donation,  } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { IDonation } from "@/types/IDonnation";

export async function getDonations(): Promise<IDonation[]> {
  await connectDB();

  try {
    const donations: IDonation[] = await Donation.find().lean();
    return donations;
  } catch (error) {
    console.error("Erreur lors de la récupération des donations :", error);
    return [];
  }
}
