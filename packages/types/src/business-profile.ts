export interface IBusinessProfileAddress {
  streetAddress?: string
  addressLocality?: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
}

export interface IBusinessProfileGeo {
  latitude?: number
  longitude?: number
}

export interface IBusinessProfile {
  _id: string
  name: string
  type: string
  description?: string
  url?: string
  telephone?: string
  email?: string
  image?: string
  address?: IBusinessProfileAddress
  geo?: IBusinessProfileGeo
  openingHours?: string[]
  priceRange?: string
  sameAs?: string[]
  updatedAt: string
}

export type IBusinessProfileUpdate = Omit<IBusinessProfile, '_id' | 'updatedAt'>
