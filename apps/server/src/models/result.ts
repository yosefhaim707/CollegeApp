import mongoose, { Schema } from 'mongoose';

const resultSchema = new Schema(
  {
    raceId: { type: String, required: true, index: true },
    driverId: { type: String, required: true, index: true },
    constructorId: { type: String, required: true },
    grid: { type: Number, required: true },
    position: { type: Number },
    positionText: { type: String, required: true },
    points: { type: Number, required: true },
    laps: { type: Number, required: true },
    status: { type: String, required: true },
    time: { type: Number },
    fastestLap: { type: Number },
    fastestLapSpeed: { type: Number },
  },
  { timestamps: true },
);

resultSchema.index({ raceId: 1, driverId: 1 }, { unique: true });

export const ResultModel = mongoose.models.Result || mongoose.model('Result', resultSchema);
