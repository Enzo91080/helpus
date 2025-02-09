import mongoose from "mongoose"

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  }
}, { timestamps: true })

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema)

export { Donation }