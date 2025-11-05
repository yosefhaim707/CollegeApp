import mongoose, { Schema } from 'mongoose';

const pitStopSchema = new Schema(
  {
    raceId: { type: String, required: true, index: true },
    driverId: { type: String, required: true, index: true },
    stop: { type: Number, required: true },
    lap: { type: Number, required: true },
    timeMs: { type: Number, required: true },
    durationMs: { type: Number, required: true },
  },
  { timestamps: true },
);

pitStopSchema.index({ raceId: 1, driverId: 1, stop: 1 }, { unique: true });

export const PitStopModel = mongoose.models.PitStop || mongoose.model('PitStop', pitStopSchema);
