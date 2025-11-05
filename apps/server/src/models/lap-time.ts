import mongoose, { Schema } from 'mongoose';

const lapTimeSchema = new Schema(
  {
    raceId: { type: String, required: true, index: true },
    driverId: { type: String, required: true, index: true },
    lap: { type: Number, required: true },
    position: { type: Number, required: true },
    timeMs: { type: Number, required: true },
  },
  { timestamps: true },
);

lapTimeSchema.index({ raceId: 1, driverId: 1, lap: 1 }, { unique: true });

export const LapTimeModel = mongoose.models.LapTime || mongoose.model('LapTime', lapTimeSchema);
