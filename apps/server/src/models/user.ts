import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    passwordHash: { type: String, required: true },
    roles: {
      type: [String],
      enum: ['admin', 'user'],
      default: ['user'],
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
