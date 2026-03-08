'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { Table, type TableColumn } from '@/components/admin/Table'
import type { ApiListResponse, ISEOPage } from '@falcanna/types'

const columns: TableColumn<ISEOPage>[] = [
  {
    key: 'route',
    label: 'Route',
    className: 'font-mono text-gray-600',
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'description',
    label: 'Description',
    className: 'max-w-xs truncate',
    sortable: false,
  },
  {
    key: 'robots.index',
    label: 'Indexed',
    sortable: false,
    render: (value) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
          value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
        }`}
      >
        {value ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    key: 'robots.follow',
    label: 'Follow',
    sortable: false,
    render: (value) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
          value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
        }`}
      >
        {value ? 'Yes' : 'No'}
      </span>
    ),
  },
]

type BulkAction = 'enable-index' | 'disable-index' | 'enable-follow' | 'disable-follow'

export default function AdminSEOPage() {
  const router = useRouter()
  const [items, setItems] = useState<ISEOPage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkLoading, setBulkLoading] = useState(false)

  useEffect(() => {
    apiClient
      .get<ApiListResponse<ISEOPage>>('/seo/admin')
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this SEO entry?')) return
    await apiClient.delete(`/seo/admin/${id}`)
    setItems((prev) => prev.filter((s) => s._id !== id))
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next })
  }

  async function handleBulkRobots(action: BulkAction) {
    if (selected.size === 0) return
    const isIndex = action === 'enable-index' || action === 'disable-index'
    const value = action === 'enable-index' || action === 'enable-follow'
    setBulkLoading(true)
    try {
      await Promise.all(
        [...selected].map((id) => {
          const item = items.find((s) => s._id === id)
          if (!item) return Promise.resolve()
          const robots = isIndex
            ? { index: value, follow: item.robots?.follow ?? true, googleBot: { index: value, follow: item.robots?.googleBot?.follow ?? true } }
            : { index: item.robots?.index ?? true, follow: value, googleBot: { index: item.robots?.googleBot?.index ?? true, follow: value } }
          return apiClient.put(`/seo/admin/${id}`, { robots })
        }),
      )
      setItems((prev) =>
        prev.map((item) => {
          if (!selected.has(item._id)) return item
          const robots = isIndex
            ? { index: value, follow: item.robots?.follow ?? true, googleBot: { index: value, follow: item.robots?.googleBot?.follow ?? true } }
            : { index: item.robots?.index ?? true, follow: value, googleBot: { index: item.robots?.googleBot?.index ?? true, follow: value } }
          return { ...item, robots }
        }),
      )
      setSelected(new Set())
    } catch (err) {
      console.error(err)
    } finally {
      setBulkLoading(false)
    }
  }

  if (loading) return <p className="text-gray-500">Loading…</p>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/admin/seo/sitemap')}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sitemap
          </button>
          <button
            onClick={() => router.push('/admin/seo/business-profile')}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Business Profile
          </button>
          <button
            onClick={() => router.push('/admin/seo/new')}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + New Route
          </button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
          <span className="text-sm font-medium text-blue-700">
            {selected.size} route{selected.size > 1 ? 's' : ''} selected
          </span>
          <div className="ml-auto flex flex-wrap gap-2">
            <button
              onClick={() => handleBulkRobots('enable-index')}
              disabled={bulkLoading}
              className="rounded bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              Enable indexing
            </button>
            <button
              onClick={() => handleBulkRobots('disable-index')}
              disabled={bulkLoading}
              className="rounded bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 disabled:opacity-50"
            >
              Disable indexing
            </button>
            <button
              onClick={() => handleBulkRobots('enable-follow')}
              disabled={bulkLoading}
              className="rounded bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              Enable follow
            </button>
            <button
              onClick={() => handleBulkRobots('disable-follow')}
              disabled={bulkLoading}
              className="rounded bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 disabled:opacity-50"
            >
              Disable follow
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <Table
        data={items}
        columns={columns}
        exportFileName="seo-routes"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actions={(item) => (
          <>
            <button
              onClick={() => router.push(`/admin/seo/${item._id}`)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </>
        )}
      />
    </div>
  )
}
