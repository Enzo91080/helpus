import mongoose from "mongoose"

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  beneficiaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beneficiary',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: String,
  channelId: String,
}, { timestamps: true })

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema)

export { Donation }