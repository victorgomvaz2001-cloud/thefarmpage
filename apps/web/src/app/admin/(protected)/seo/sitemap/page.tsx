'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import type { ApiListResponse, ISEOPage } from '@falcanna/types'

interface SitemapMeta {
  generatedAt: string
}

export default function SitemapPage() {
  const router = useRouter()
  const [meta, setMeta] = useState<SitemapMeta | null>(null)
  const [routes, setRoutes] = useState<ISEOPage[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      apiClient.get<{ data: SitemapMeta | null }>('/sitemap/meta'),
      apiClient.get<ApiListResponse<ISEOPage>>('/seo/admin'),
    ])
      .then(([metaRes, routesRes]) => {
        setMeta(metaRes.data)
        setRoutes(routesRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function handleGenerate() {
    setError(null)
    setGenerating(true)
    try {
      const res = await apiClient.post<{ data: SitemapMeta }>('/sitemap/admin/generate', {})
      setMeta(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating sitemap')
    } finally {
      setGenerating(false)
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
        <h1 className="text-2xl font-bold text-gray-900">Sitemap</h1>
      </div>

      {/* ── Estado ─────────────────────────────────────────────── */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Estado
            </p>
            {meta ? (
              <>
                <p className="text-sm text-gray-700">
                  Último generado:{' '}
                  <span className="font-medium">
                    {new Date(meta.generatedAt).toLocaleString('es-ES')}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {routes.length} {routes.length === 1 ? 'ruta' : 'rutas'} incluidas
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">Sitemap no generado aún.</p>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            {meta && (
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Ver /sitemap.xml
              </a>
            )}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {generating ? 'Generando…' : meta ? 'Regenerar' : 'Generar sitemap'}
            </button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {/* ── Rutas incluidas ─────────────────────────────────────── */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Rutas que se incluirán
          </p>
        </div>
        {routes.length === 0 ? (
          <p className="px-6 py-4 text-sm text-gray-400">No hay rutas SEO configuradas.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {routes.map((r) => (
              <li key={r._id} className="flex items-center justify-between px-6 py-3">
                <span className="font-mono text-sm text-gray-700">{r.route}</span>
                <span className="text-xs text-gray-400">
                  {new Date(r.updatedAt).toLocaleDateString('es-ES')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
