import mongoose, { Schema } from 'mongoose';

const favoriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    entityType: { type: String, enum: ['driver', 'constructor', 'race'], required: true },
    entityId: { type: String, required: true },
  },
  { timestamps: true },
);

favoriteSchema.index({ userId: 1, entityType: 1, entityId: 1 }, { unique: true });

export const FavoriteModel = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
