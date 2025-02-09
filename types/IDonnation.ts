import mongoose from "mongoose";

export interface IDonation extends Partial<Document> {
    _id: mongoose.Types.ObjectId;
    amount: number;
    type: string;
    date: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
  
  