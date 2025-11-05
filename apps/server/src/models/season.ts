import mongoose, { Schema } from 'mongoose';

const seasonSchema = new Schema(
  {
    year: { type: Number, required: true, unique: true, index: true },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

export const SeasonModel = mongoose.models.Season || mongoose.model('Season', seasonSchema);
