import { Schema, model, Document } from 'mongoose'
import type { IBusinessProfile } from '@falcanna/types'

export interface IBusinessProfileDocument extends Omit<IBusinessProfile, '_id'>, Document {}

const businessProfileSchema = new Schema<IBusinessProfileDocument>(
  {
    name: { type: String, required: true },
    type: { type: String, default: 'LocalBusiness' },
    description: String,
    url: String,
    telephone: String,
    email: String,
    image: String,
    address: {
      type: new Schema(
        {
          streetAddress: String,
          addressLocality: String,
          addressRegion: String,
          postalCode: String,
          addressCountry: String,
        },
        { _id: false },
      ),
    },
    geo: {
      type: new Schema({ latitude: Number, longitude: Number }, { _id: false }),
    },
    openingHours: [String],
    priceRange: String,
    sameAs: [String],
  },
  { timestamps: true },
)

export const BusinessProfile = model<IBusinessProfileDocument>(
  'BusinessProfile',
  businessProfileSchema,
)
