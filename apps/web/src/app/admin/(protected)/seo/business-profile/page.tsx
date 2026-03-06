'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import type { IBusinessProfile, IBusinessProfileUpdate } from '@falcanna/types'

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

export default function BusinessProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<IBusinessProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openingHours, setOpeningHours] = useState<string[]>([])
  const [sameAs, setSameAs] = useState<string[]>([])

  useEffect(() => {
    apiClient
      .get<{ data: IBusinessProfile | null }>('/business-profile')
      .then((res) => {
        if (res.data) {
          setProfile(res.data)
          setOpeningHours(res.data.openingHours ?? [])
          setSameAs(res.data.sameAs ?? [])
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value ?? ''
    const getNum = (name: string) => {
      const v = parseFloat(get(name))
      return isNaN(v) ? undefined : v
    }

    const data: IBusinessProfileUpdate = {
      name: get('name'),
      type: get('type') || 'LocalBusiness',
      description: get('description') || undefined,
      url: get('url') || undefined,
      telephone: get('telephone') || undefined,
      email: get('email') || undefined,
      image: get('image') || undefined,
      priceRange: get('priceRange') || undefined,
      address: {
        streetAddress: get('address.streetAddress') || undefined,
        addressLocality: get('address.addressLocality') || undefined,
        addressRegion: get('address.addressRegion') || undefined,
        postalCode: get('address.postalCode') || undefined,
        addressCountry: get('address.addressCountry') || undefined,
      },
      geo: {
        latitude: getNum('geo.latitude'),
        longitude: getNum('geo.longitude'),
      },
      openingHours: openingHours.filter(Boolean),
      sameAs: sameAs.filter(Boolean),
    }

    try {
      await apiClient.put('/business-profile/admin', data)
      router.push('/admin/seo')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save business profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500">Loading…</p>

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/seo')}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← SEO
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
      </div>

      <p className="mb-6 text-sm text-gray-500">
        Datos usados para el schema markup{' '}
        <span className="font-mono text-xs text-gray-400">LocalBusiness</span> que se inyecta en
        todas las páginas públicas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Identidad ───────────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Identidad</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Nombre *">
                <input name="name" required defaultValue={profile?.name ?? ''} className={inputCls} />
              </Field>
            </div>
            <Field label="Tipo (schema.org)">
              <input
                name="type"
                defaultValue={profile?.type ?? 'LocalBusiness'}
                placeholder="LocalBusiness"
                className={inputCls}
              />
            </Field>
            <Field label="Price Range">
              <input
                name="priceRange"
                defaultValue={profile?.priceRange ?? ''}
                placeholder="€€"
                className={inputCls}
              />
            </Field>
            <div className="col-span-2">
              <Field label="Descripción">
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={profile?.description ?? ''}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        </section>

        {/* ── Contacto ────────────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Contacto</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="URL">
              <input name="url" type="url" defaultValue={profile?.url ?? ''} className={inputCls} />
            </Field>
            <Field label="Teléfono">
              <input name="telephone" defaultValue={profile?.telephone ?? ''} className={inputCls} />
            </Field>
            <Field label="Email">
              <input name="email" type="email" defaultValue={profile?.email ?? ''} className={inputCls} />
            </Field>
            <Field label="Imagen URL">
              <input name="image" defaultValue={profile?.image ?? ''} className={inputCls} />
            </Field>
          </div>
        </section>

        {/* ── Dirección ───────────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Dirección</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Calle">
                <input
                  name="address.streetAddress"
                  defaultValue={profile?.address?.streetAddress ?? ''}
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Ciudad">
              <input
                name="address.addressLocality"
                defaultValue={profile?.address?.addressLocality ?? ''}
                className={inputCls}
              />
            </Field>
            <Field label="Región / Provincia">
              <input
                name="address.addressRegion"
                defaultValue={profile?.address?.addressRegion ?? ''}
                className={inputCls}
              />
            </Field>
            <Field label="Código Postal">
              <input
                name="address.postalCode"
                defaultValue={profile?.address?.postalCode ?? ''}
                className={inputCls}
              />
            </Field>
            <Field label="País (ISO)">
              <input
                name="address.addressCountry"
                defaultValue={profile?.address?.addressCountry ?? ''}
                placeholder="ES"
                className={inputCls}
              />
            </Field>
          </div>
        </section>

        {/* ── Geo ─────────────────────────────────────────────── */}
        <section className={sectionCls}>
          <h2 className={sectionTitle}>Coordenadas</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Latitud">
              <input
                name="geo.latitude"
                type="number"
                step="any"
                defaultValue={profile?.geo?.latitude ?? ''}
                className={inputCls}
              />
            </Field>
            <Field label="Longitud">
              <input
                name="geo.longitude"
                type="number"
                step="any"
                defaultValue={profile?.geo?.longitude ?? ''}
                className={inputCls}
              />
            </Field>
          </div>
        </section>

        {/* ── Horarios ────────────────────────────────────────── */}
        <section className={sectionCls}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className={sectionTitle + ' mb-0'}>Horarios de apertura</h2>
            <button
              type="button"
              onClick={() => setOpeningHours((prev) => [...prev, ''])}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              + Añadir horario
            </button>
          </div>
          {openingHours.length === 0 ? (
            <p className="text-sm text-gray-400">
              Sin horarios. Formato: <span className="font-mono">Mo-Fr 09:00-20:00</span>
            </p>
          ) : (
            <div className="space-y-2">
              {openingHours.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={h}
                    onChange={(e) =>
                      setOpeningHours((prev) =>
                        prev.map((v, j) => (j === i ? e.target.value : v)),
                      )
                    }
                    placeholder="Mo-Fr 09:00-20:00"
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setOpeningHours((prev) => prev.filter((_, j) => j !== i))}
                    className="text-sm text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Redes sociales ──────────────────────────────────── */}
        <section className={sectionCls}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className={sectionTitle + ' mb-0'}>Redes sociales (sameAs)</h2>
            <button
              type="button"
              onClick={() => setSameAs((prev) => [...prev, ''])}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              + Añadir URL
            </button>
          </div>
          {sameAs.length === 0 ? (
            <p className="text-sm text-gray-400">Sin perfiles configurados.</p>
          ) : (
            <div className="space-y-2">
              {sameAs.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={url}
                    onChange={(e) =>
                      setSameAs((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                    }
                    placeholder="https://www.instagram.com/..."
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setSameAs((prev) => prev.filter((_, j) => j !== i))}
                    className="text-sm text-red-400 hover:text-red-600"
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
            disabled={saving}
            className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/seo')}
            className="rounded border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
