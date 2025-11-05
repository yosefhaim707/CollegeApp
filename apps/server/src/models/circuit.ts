import mongoose, { Schema } from 'mongoose';

const circuitSchema = new Schema(
  {
    circuitId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      locality: { type: String, required: true },
      country: { type: String, required: true },
    },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

circuitSchema.index({ location: '2dsphere' });

export const CircuitModel = mongoose.models.Circuit || mongoose.model('Circuit', circuitSchema);
