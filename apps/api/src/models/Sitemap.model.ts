import { Schema, model, Document } from 'mongoose'

export interface ISitemapDocument extends Document {
  xml: string
  generatedAt: Date
}

const sitemapSchema = new Schema<ISitemapDocument>({
  xml: { type: String, required: true },
  generatedAt: { type: Date, required: true },
})

export const Sitemap = model<ISitemapDocument>('Sitemap', sitemapSchema)
