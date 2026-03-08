import { useTranslations } from 'next-intl'

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-500 leading-relaxed">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5731]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function WhatWillYouFindSection() {
  const t = useTranslations('home.whatWillYouFind')

  return (
    <section className="bg-[#f7f6f2] py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="font-storica mt-3 text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Low Prices */}
          <div className="bg-white p-8">
            <h3 className="font-storica font-bold text-gray-900 text-xl">
              {t('lowPrice.title')}
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{t('lowPrice.p1')}</p>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">{t('lowPrice.p2')}</p>
            <BulletList items={[t('lowPrice.item1'), t('lowPrice.item2'), t('lowPrice.item3')]} />
          </div>

          {/* Local Strains */}
          <div className="bg-white p-8">
            <h3 className="font-storica font-bold text-gray-900 text-xl">
              {t('localStrains.title')}
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{t('localStrains.text')}</p>
          </div>

          {/* Community */}
          <div className="bg-white p-8">
            <h3 className="font-storica font-bold text-gray-900 text-xl">
              {t('community.title')}
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{t('community.listIntro')}</p>
            <BulletList items={[t('community.item1'), t('community.item2'), t('community.item3'), t('community.item4')]} />
          </div>
        </div>
      </div>
    </section>
  )
}
