import { useTranslations } from 'next-intl'

function RequirementCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="group relative overflow-hidden bg-[#1a2210] min-h-[220px] h-full cursor-default">
      {/* Depth gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4a5731]/30 via-transparent to-black/50" />
      {/* Hover darkening */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

      {/* Title — centered, shifts up on hover */}
      <div className="absolute inset-0 flex items-center justify-center px-7 transition-transform duration-500 ease-out group-hover:-translate-y-[18%]">
        <h3 className="font-storica text-xl font-bold leading-tight text-white text-center">
          {title}
        </h3>
      </div>

      {/* Description panel — slides up from bottom */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full px-7 pb-7 pt-0 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <div className="border-t border-white/20 pt-4">
          <p className="text-sm leading-relaxed text-white/80">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default function RequirementsSection() {
  const t = useTranslations('home.requirements')

  return (
    <section className="overflow-hidden">
      {/*
        Desktop layout: 3-column grid
          col-1 (1fr):  age card (top)  + membership card (bottom)
          col-2 (auto): section title   (spans 2 rows)
          col-3 (1fr):  student card (top) + legal card (bottom)

        Mobile: title first, then 2×2 card grid
      */}
      <div className="grid grid-cols-1 gap-[2px] lg:grid-cols-[1fr_300px_1fr] lg:grid-rows-2 lg:h-[540px]">

        {/* ── LEFT COLUMN ── */}
        {/* Age — top-left */}
        <div className="lg:col-start-1 lg:row-start-1 min-h-[220px] lg:min-h-0">
          <RequirementCard title={t('age.title')} text={t('age.text')} />
        </div>

        {/* Membership — bottom-left */}
        <div className="lg:col-start-1 lg:row-start-2 min-h-[220px] lg:min-h-0">
          <RequirementCard title={t('membership.title')} text={t('membership.text')} />
        </div>

        {/* ── CENTER BLOCK — spans both rows ── */}
        <div className="order-first bg-[#f7f6f2] flex flex-col items-center justify-center text-center px-10 py-16 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5731]">
            {t('label')}
          </span>
          <h2 className="font-storica mt-3 text-3xl font-bold tracking-tight text-gray-900 leading-snug">
            {t('title')}
          </h2>
          <div className="mt-6 h-px w-12 bg-[#4a5731]/30" />
        </div>

        {/* ── RIGHT COLUMN ── */}
        {/* Student — top-right */}
        <div className="lg:col-start-3 lg:row-start-1 min-h-[220px] lg:min-h-0">
          <RequirementCard title={t('student.title')} text={t('student.text')} />
        </div>

        {/* Legal — bottom-right */}
        <div className="lg:col-start-3 lg:row-start-2 min-h-[220px] lg:min-h-0">
          <RequirementCard title={t('legal.title')} text={t('legal.text')} />
        </div>
      </div>
    </section>
  )
}
