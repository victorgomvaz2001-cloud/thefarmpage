import { BusinessProfile } from '../models/BusinessProfile.model'
import type { IBusinessProfileUpdate } from '@falcanna/types'

export class BusinessProfileService {
  async get() {
    return BusinessProfile.findOne().lean()
  }

  async upsert(data: IBusinessProfileUpdate) {
    return BusinessProfile.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }).lean()
  }
}

export const businessProfileService = new BusinessProfileService()
