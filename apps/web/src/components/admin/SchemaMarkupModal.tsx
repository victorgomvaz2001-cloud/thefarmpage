'use client'

import { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

export type SchemaType =
  | 'WebPage'
  | 'Article'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'Product'
  | 'Organization'
  | 'Event'

const SCHEMA_TYPES: { value: SchemaType; label: string; description: string }[] = [
  { value: 'WebPage',        label: 'Web Page',       description: 'Página web genérica'              },
  { value: 'Article',        label: 'Article',         description: 'Artículo o entrada de blog'       },
  { value: 'FAQPage',        label: 'FAQ Page',        description: 'Página de preguntas frecuentes'   },
  { value: 'BreadcrumbList', label: 'Breadcrumb',      description: 'Migas de pan de navegación'       },
  { value: 'Product',        label: 'Product',         description: 'Producto o servicio'              },
  { value: 'Organization',   label: 'Organization',    description: 'Organización o empresa'           },
  { value: 'Event',          label: 'Event',           description: 'Evento presencial o virtual'      },
]

const inputCls =
  'mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const labelCls = 'block text-sm font-medium text-gray-700'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  )
}

// ── Per-type forms ─────────────────────────────────────────────────────────

function WebPageForm({ onChange }: { onChange: (data: Record<string, unknown>) => void }) {
  const update = (key: string, value: string) =>
    onChange({ '@type': 'WebPage', [key]: value })

  return (
    <div className="space-y-3">
      <Field label="Name">
        <input className={inputCls} onChange={(e) => update('name', e.target.value)} />
      </Field>
      <Field label="Description">
        <textarea rows={2} className={inputCls} onChange={(e) => update('description', e.target.value)} />
      </Field>
      <Field label="URL">
        <input className={inputCls} onChange={(e) => update('url', e.target.value)} />
      </Field>
    </div>
  )
}

function ArticleForm({ onChange }: { onChange: (data: Record<string, unknown>) => void }) {
  const [data, setData] = useState<Record<string, unknown>>({ '@type': 'Article' })
  const set = (key: string, value: string) => {
    const next = { ...data, [key]: value }
    setData(next)
    onChange(next)
  }
  return (
    <div className="space-y-3">
      <Field label="Headline">
        <input className={inputCls} onChange={(e) => set('headline', e.target.value)} />
      </Field>
      <Field label="Description">
        <textarea rows={2} className={inputCls} onChange={(e) => set('description', e.target.value)} />
      </Field>
      <Field label="Author">
        <input className={inputCls} onChange={(e) => set('author', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date Published">
          <input type="date" className={inputCls} onChange={(e) => set('datePublished', e.target.value)} />
        </Field>
        <Field label="Date Modified">
          <input type="date" className={inputCls} onChange={(e) => set('dateModified', e.target.value)} />
        </Field>
      </div>
      <Field label="Image URL">
        <input className={inputCls} onChange={(e) => set('image', e.target.value)} />
      </Field>
    </div>
  )
}

function FAQPageForm({ onChange }: { onChange: (data: Record<string, unknown>) => void }) {
  const [items, setItems] = useState([{ question: '', answer: '' }])

  function update(idx: number, key: 'question' | 'answer', value: string) {
    const next = items.map((item, i) => (i === idx ? { ...item, [key]: value } : item))
    setItems(next)
    onChange({
      '@type': 'FAQPage',
      mainEntity: next.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded border border-gray-200 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Q{i + 1}</span>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const next = items.filter((_, j) => j !== i)
                  setItems(next)
                }}
                className="text-xs text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            )}
          </div>
          <Field label="Pregunta">
            <input
              className={inputCls}
              value={item.question}
              onChange={(e) => update(i, 'question', e.target.value)}
            />
          </Field>
          <Field label="Respuesta">
            <textarea
              rows={2}
              className={inputCls}
              value={item.answer}
              onChange={(e) => update(i, 'answer', e.target.value)}
            />
          </Field>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { question: '', answer: '' }])}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        + Añadir pregunta
      </button>
    </div>
  )
}

function BreadcrumbForm({ onChange }: { onChange: (data: Record<string, unknown>) => void }) {
  const [items, setItems] = useState([{ name: '', url: '' }])

  function update(idx: number, key: 'name' | 'url', value: string) {
    const next = items.map((item, i) => (i === idx ? { ...item, [key]: value } : item))
    setItems(next)
    onChange({
      '@type': 'BreadcrumbList',
      itemListElement: next.map((item, pos) => ({
        '@type': 'ListItem',
        position: pos + 1,
        name: item.name,
        item: item.url,
      })),
    })
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-5 shrink-0">{i + 1}</span>
          <input
            placeholder="Nombre"
            value={item.name}
            onChange={(e) => update(i, 'name', e.target.value)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="URL"
            value={item.url}
            onChange={(e) => update(i, 'url', e.target.value)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
              className="text-xs text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { name: '', url: '' }])}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        + Añadir nivel
      </button>
    </div>
  )
}

function ProductForm({ onChange }: { onChange: (data: Record<string, unknown>) => void }) {
  const [data, setData] = useState<Record<string, unknown>>({ '@type': 'Product' })
  const set = (key: string, value: string) => {
    const next = { ...data, [key]: value }
    setData(next)
    onChange(next)
  }
  const setOffer = (key: string, value: string) => {
    const offer = { '@type': 'Offer', ...(data.offers as Record<string, unknown> ?? {}), [key]: value }
    const next = { ...data, offers: offer }
    setData(next)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      <Field label="Name">
        <input className={inputCls} onChange={(e) => set('name', e.target.value)} />
      </Field>
      <Field label="Description">
        <textarea rows={2} className={inputCls} onChange={(e) => set('description', e.target.value)} />
      </Field>
      <Field label="Image URL">
        <input className={inputCls} onChange={(e) => set('image', e.target.value)} />
      </Field>
      <Field label="Brand">
        <input className={inputCls} onChange={(e) => set('brand', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Precio">
          <input type="number" step="0.01" className={inputCls} onChange={(e) => setOffer('price', e.target.value)} />
        </Field>
        <Field label="Moneda (ISO)">
          <input placeholder="EUR" className={inputCls} onChange={(e) => setOffer('priceCurrency', e.target.value)} />
        </Field>
      </div>
    </div>
  )
}

function OrganizationForm({ onChange }: { onChange: (data: Record<string, unknown>) => void }) {
  const [data, setData] = useState<Record<string, unknown>>({ '@type': 'Organization' })
  const [sameAs, setSameAs] = useState<string[]>([])

  const set = (key: string, value: string) => {
    const next = { ...data, [key]: value }
    setData(next)
    onChange(next)
  }
  const updateSameAs = (urls: string[]) => {
    setSameAs(urls)
    onChange({ ...data, sameAs: urls.filter(Boolean) })
  }

  return (
    <div className="space-y-3">
      <Field label="Name">
        <input className={inputCls} onChange={(e) => set('name', e.target.value)} />
      </Field>
      <Field label="URL">
        <input className={inputCls} onChange={(e) => set('url', e.target.value)} />
      </Field>
      <Field label="Logo URL">
        <input className={inputCls} onChange={(e) => set('logo', e.target.value)} />
      </Field>
      <Field label="Description">
        <textarea rows={2} className={inputCls} onChange={(e) => set('description', e.target.value)} />
      </Field>
      <div>
        <div className="flex items-center justify-between">
          <label className={labelCls}>SameAs (redes sociales)</label>
          <button
            type="button"
            onClick={() => updateSameAs([...sameAs, ''])}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            + Añadir
          </button>
        </div>
        <div className="mt-1 space-y-1">
          {sameAs.map((url, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={url}
                onChange={(e) => updateSameAs(sameAs.map((v, j) => (j === i ? e.target.value : v)))}
                placeholder="https://..."
                className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => updateSameAs(sameAs.filter((_, j) => j !== i))}
                className="text-xs text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EventForm({ onChange }: { onChange: (data: Record<string, unknown>) => void }) {
  const [data, setData] = useState<Record<string, unknown>>({ '@type': 'Event' })
  const set = (key: string, value: string) => {
    const next = { ...data, [key]: value }
    setData(next)
    onChange(next)
  }
  return (
    <div className="space-y-3">
      <Field label="Name">
        <input className={inputCls} onChange={(e) => set('name', e.target.value)} />
      </Field>
      <Field label="Description">
        <textarea rows={2} className={inputCls} onChange={(e) => set('description', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Date">
          <input type="datetime-local" className={inputCls} onChange={(e) => set('startDate', e.target.value)} />
        </Field>
        <Field label="End Date">
          <input type="datetime-local" className={inputCls} onChange={(e) => set('endDate', e.target.value)} />
        </Field>
      </div>
      <Field label="Location (nombre del lugar)">
        <input className={inputCls} onChange={(e) => set('location', e.target.value)} />
      </Field>
      <Field label="Image URL">
        <input className={inputCls} onChange={(e) => set('image', e.target.value)} />
      </Field>
      <Field label="Organizer">
        <input className={inputCls} onChange={(e) => set('organizer', e.target.value)} />
      </Field>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────

interface SchemaMarkupModalProps {
  onAdd: (schema: Record<string, unknown>) => void
  onClose: () => void
}

export function SchemaMarkupModal({ onAdd, onClose }: SchemaMarkupModalProps) {
  const [step, setStep] = useState<'select' | 'fill'>('select')
  const [selectedType, setSelectedType] = useState<SchemaType | null>(null)
  const [pending, setPending] = useState<Record<string, unknown>>({})

  function handleTypeSelect(type: SchemaType) {
    setSelectedType(type)
    setPending({ '@type': type })
    setStep('fill')
  }

  function handleAdd() {
    if (Object.keys(pending).length > 1) {
      onAdd(pending)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            {step === 'fill' && (
              <button
                type="button"
                onClick={() => setStep('select')}
                className="mr-3 text-sm text-gray-400 hover:text-gray-600"
              >
                ←
              </button>
            )}
            <span className="font-semibold text-gray-900">
              {step === 'select' ? 'Seleccionar tipo de schema' : `Schema: ${selectedType}`}
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === 'select' && (
            <div className="grid grid-cols-1 gap-2">
              {SCHEMA_TYPES.map(({ value, label, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleTypeSelect(value)}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 text-left hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'fill' && selectedType && (
            <div className="space-y-4">
              {selectedType === 'WebPage'        && <WebPageForm onChange={setPending} />}
              {selectedType === 'Article'        && <ArticleForm onChange={setPending} />}
              {selectedType === 'FAQPage'        && <FAQPageForm onChange={setPending} />}
              {selectedType === 'BreadcrumbList' && <BreadcrumbForm onChange={setPending} />}
              {selectedType === 'Product'        && <ProductForm onChange={setPending} />}
              {selectedType === 'Organization'   && <OrganizationForm onChange={setPending} />}
              {selectedType === 'Event'          && <EventForm onChange={setPending} />}
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'fill' && (
          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Añadir schema
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
