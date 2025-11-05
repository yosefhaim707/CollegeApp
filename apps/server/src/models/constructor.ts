import mongoose, { Schema } from 'mongoose';

const constructorSchema = new Schema(
  {
    constructorId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    url: { type: String, required: true },
    color: { type: String },
  },
  { timestamps: true },
);

export const ConstructorModel =
  mongoose.models.Constructor || mongoose.model('Constructor', constructorSchema);
