import mongoose, { Schema } from 'mongoose';

const raceSchema = new Schema(
  {
    raceId: { type: String, required: true, unique: true, index: true },
    year: { type: Number, required: true },
    round: { type: Number, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    circuitId: { type: String, required: true, index: true },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

raceSchema.index({ year: 1, round: 1 }, { unique: true });

export const RaceModel = mongoose.models.Race || mongoose.model('Race', raceSchema);
