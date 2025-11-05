import mongoose, { Schema } from 'mongoose';

const driverSchema = new Schema(
  {
    driverId: { type: String, required: true, unique: true, index: true },
    code: { type: String, required: true, maxlength: 3 },
    number: { type: String },
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

driverSchema.index({ nationality: 1 });
driverSchema.index({ givenName: 'text', familyName: 'text', code: 'text' });

driverSchema.virtual('fullName').get(function fullName(this: { givenName: string; familyName: string }) {
  return `${this.givenName} ${this.familyName}`.trim();
});

export const DriverModel = mongoose.models.Driver || mongoose.model('Driver', driverSchema);
