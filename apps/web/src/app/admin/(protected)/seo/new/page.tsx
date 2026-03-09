'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { SchemaMarkupModal } from '@/components/admin/SchemaMarkupModal'
import type { ISEOPageCreate } from '@falcanna/types'

const inputCls =
  'mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

const labelCls = 'block text-sm font-medium text-gray-700'

const sectionCls = 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm'

const sectionTitle = 'mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  )
}

const BASE_URL = 'https://www.thefarmsocialclub.com'

type AlternateKey = 'es' | 'en' | 'x-default'

const ALTERNATE_LOCALES: { key: AlternateKey; label: string; getUrl: (r: string) => string }[] = [
  {
    key: 'es',
    label: 'es',
    getUrl: (r) => BASE_URL + (r.startsWith('/en') ? r.slice(3) || '/' : r),
  },
  {
    key: 'en',
    label: 'en',
    getUrl: (r) => BASE_URL + (r.startsWith('/en') ? r : r === '/' ? '/en' : `/en${r}`),
  },
  {
    key: 'x-default',
    label: 'x-default',
    getUrl: (r) => BASE_URL + (r.startsWith('/en') ? r.slice(3) || '/' : r),
  },
]

export default function NewSEOPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [schemas, setSchemas] = useState<Record<string, unknown>[]>([])
  const [showModal, setShowModal] = useState(false)

  const [route, setRoute] = useState('')
  const [canonical, setCanonical] = useState('')
  const canonicalManual = useRef(false)

  const [alternateEnabled, setAlternateEnabled] = useState<Record<AlternateKey, boolean>>(
    { es: false, en: false, 'x-default': false },
  )
  const [alternateUrls, setAlternateUrls] = useState<Record<AlternateKey, string>>(
    { es: '', en: '', 'x-default': '' },
  )
  const alternateManual = useRef<Record<AlternateKey, boolean>>(
    { es: false, en: false, 'x-default': false },
  )

  useEffect(() => {
    if (!canonicalManual.current) setCanonical(BASE_URL + route)
    setAlternateUrls((prev) => {
      const next = { ...prev }
      for (const { key, getUrl } of ALTERNATE_LOCALES) {
        if (!alternateManual.current[key]) next[key] = getUrl(route)
      }
      return next
    })
  }, [route])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value ?? ''

    const languages: Record<string, string> = {}
    for (const { key } of ALTERNATE_LOCALES) {
      if (alternateEnabled[key] && alternateUrls[key].trim()) {
        languages[key] = alternateUrls[key].trim()
      }
    }

    const data: ISEOPageCreate = {
      route,
      title: get('title'),
      description: get('description'),
      canonical: canonical || undefined,
      alternates: Object.keys(languages).length ? { languages } : undefined,
      og: {
        title: get('og.title') || undefined,
        description: get('og.description') || undefined,
        image: get('og.image') || undefined,
        url: get('og.url') || undefined,
        type: get('og.type') || undefined,
        locale: get('og.locale') || undefined,
      },
      twitterCard: {
        card: (get('twitterCard.card') as ISEOPageCreate['twitterCard']['card']) || undefined,
        title: get('twitterCard.title') || undefined,
        description: get('twitterCard.description') || undefined,
        image: get('twitterCard.image') || undefined,
      },
      robots: {
        index: (form.elements.namedItem('robots.index') as HTMLInputElement)?.checked ?? true,
        follow: (form.elements.namedItem('robots.follow') as HTMLInputElement)?.checked ?? true,
      },
      schemaMarkup: schemas.length ? schemas : undefined,
    }

    try {
      await apiClient.post('/seo/admin', data)
      router.push('/admin/seo')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create SEO entry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">New SEO Route</h1>

      {showModal && (
        <SchemaMarkupModal
          onAdd={(schema) => setSchemas((prev) => [...prev, schema])}
          onClose={() => setShowModal(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Basic ───────────────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Basic</h2>
          <div className="space-y-4">
            <Field label="Route">
              <input
                required
                placeholder="/about"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className={inputCls + ' font-mono'}
              />
            </Field>
            <Field label="Title">
              <input name="title" required className={inputCls} />
            </Field>
            <Field label="Description">
              <textarea name="description" rows={3} required className={inputCls} />
            </Field>
            <Field label="Canonical URL">
              <input
                value={canonical}
                onChange={(e) => {
                  canonicalManual.current = true
                  setCanonical(e.target.value)
                }}
                className={inputCls}
              />
            </Field>
          </div>
        </section>

        {/* ── Alternates (hreflang) ────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Alternates (hreflang)</h2>
          <div className="space-y-3">
            {ALTERNATE_LOCALES.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <label className="flex items-center gap-2 w-28 shrink-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alternateEnabled[key]}
                    onChange={(e) =>
                      setAlternateEnabled((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-mono text-sm text-gray-700">{label}</span>
                </label>
                <input
                  disabled={!alternateEnabled[key]}
                  value={alternateUrls[key]}
                  onChange={(e) => {
                    alternateManual.current[key] = true
                    setAlternateUrls((prev) => ({ ...prev, [key]: e.target.value }))
                  }}
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Open Graph ──────────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Open Graph</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="OG Title">
              <input name="og.title" className={inputCls} />
            </Field>
            <Field label="OG Type">
              <input name="og.type" placeholder="website" className={inputCls} />
            </Field>
            <div className="col-span-2">
              <Field label="OG Description">
                <textarea name="og.description" rows={2} className={inputCls} />
              </Field>
            </div>
            <Field label="OG URL">
              <input name="og.url" className={inputCls} />
            </Field>
            <Field label="OG Image URL">
              <input name="og.image" className={inputCls} />
            </Field>
            <Field label="OG Locale">
              <input name="og.locale" placeholder="es_ES" className={inputCls} />
            </Field>
          </div>
        </section>

        {/* ── Twitter / X Card ────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Twitter / X Card</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Card Type">
              <select name="twitterCard.card" className={inputCls}>
                <option value="">- None -</option>
                <option value="summary">summary</option>
                <option value="summary_large_image">summary_large_image</option>
                <option value="app">app</option>
                <option value="player">player</option>
              </select>
            </Field>
            <Field label="Twitter Title">
              <input name="twitterCard.title" className={inputCls} />
            </Field>
            <div className="col-span-2">
              <Field label="Twitter Description">
                <textarea name="twitterCard.description" rows={2} className={inputCls} />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="Twitter Image URL">
                <input name="twitterCard.image" className={inputCls} />
              </Field>
            </div>
          </div>
        </section>

        {/* ── Robots ──────────────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Robots</h2>
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                { name: 'robots.index', label: 'Index' },
                { name: 'robots.follow', label: 'Follow' },
              ] as const
            ).map(({ name, label }) => (
              <label key={name} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name={name}
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* ── Schema Markup ────────────────────────────────────── */}
        <section className={sectionCls}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className={sectionTitle + ' mb-0'}>Schema Markup (JSON-LD)</h2>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="rounded bg-gray-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700"
            >
              + Añadir schema
            </button>
          </div>
          {schemas.length === 0 ? (
            <p className="text-sm text-gray-400">Sin schemas configurados.</p>
          ) : (
            <div className="space-y-2">
              {schemas.map((schema, i) => (
                <div key={i} className="flex items-center justify-between rounded border border-gray-200 px-4 py-2">
                  <span className="font-mono text-xs text-gray-600">
                    {String(schema['@type'] ?? 'Unknown')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSchemas((prev) => prev.filter((_, j) => j !== i))}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating…' : 'Create Route'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/seo')}
            className="rounded border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
