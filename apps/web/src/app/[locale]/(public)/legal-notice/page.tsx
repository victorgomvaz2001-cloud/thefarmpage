import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { fetchSEO, buildMetadata } from '@/lib/seo'
import TableOfContents from '@/components/legal/TableOfContents'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const route = locale === 'es' ? '/legal-notice' : `/${locale}/legal-notice`
  const [seo, t] = await Promise.all([fetchSEO(route), getTranslations('legalNotice')])
  return buildMetadata(seo, { title: t('title') })
}

export default async function LegalNoticePage() {
  const [t, tl] = await Promise.all([
    getTranslations('legalNotice'),
    getTranslations('legal'),
  ])

  const sections = [
    { id: 'section-0', title: t('s1Title'), content: t('s1Content') },
    { id: 'section-1', title: t('s2Title'), content: t('s2Content') },
    { id: 'section-2', title: t('s3Title'), content: t('s3Content') },
    { id: 'section-3', title: t('s4Title'), content: t('s4Content') },
    { id: 'section-4', title: t('s5Title'), content: t('s5Content') },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">

        <aside className="hidden lg:block">
          <TableOfContents sections={sections} label={tl('toc')} />
        </aside>

        <div>
          <h1 className="font-storica text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-2 text-sm text-gray-400">{t('lastUpdated')}</p>
          <p className="mt-6 text-gray-700 leading-relaxed">{t('intro')}</p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-storica text-xl font-semibold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
