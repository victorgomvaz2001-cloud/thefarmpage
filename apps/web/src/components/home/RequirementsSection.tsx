import { useTranslations } from 'next-intl'

function AgeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="18.14" r="11.14" />
      <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
    </svg>
  )
}

function MembershipIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="26" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 13h26" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="19.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 18h7M16 21h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function StudentIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 6L3 12l13 6 13-6-13-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 15v7c0 2.5 3.582 4 8 4s8-1.5 8-4v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LegalIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4v24M16 4l-9 5M16 4l9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9L3 20c0 2.5 1.8 4 4 4s4-1.5 4-4L7 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M25 9l-4 11c0 2.5 1.8 4 4 4s4-1.5 4-4L25 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 28H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function RequirementCard({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="group relative overflow-hidden bg-[#1a2210] min-h-[220px] h-full cursor-default">
      {/* Depth gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4a5731]/30 via-transparent to-black/50" />
      {/* Hover darkening — desktop only */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 lg:transition-colors lg:duration-500 lg:group-hover:bg-black/15" />

      {/* Mobile — static layout, always visible */}
      <div className="lg:hidden flex flex-col items-center justify-center gap-4 px-7 py-10 h-full relative z-10 text-center">
        <div className="text-[#a8bc7a]">{icon}</div>
        <h3 className="font-storica text-xl font-bold leading-tight text-white">{title}</h3>
        <div className="w-full border-t border-white/20 pt-4">
          <p className="text-sm leading-relaxed text-white/80">{text}</p>
        </div>
      </div>

      {/* Desktop — animated on hover */}
      <div className="hidden lg:block">
        {/* Icon + Title — centered, shifts up on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-7 transition-transform duration-500 ease-out group-hover:-translate-y-[18%]">
          <div className="text-[#a8bc7a]">{icon}</div>
          <h3 className="font-storica text-xl font-bold leading-tight text-white text-center">{title}</h3>
        </div>

        {/* Description panel — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full px-7 pb-7 pt-0 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm leading-relaxed text-white/80">{text}</p>
          </div>
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
          <RequirementCard title={t('age.title')} text={t('age.text')} icon={<AgeIcon />} />
        </div>

        {/* Membership — bottom-left */}
        <div className="lg:col-start-1 lg:row-start-2 min-h-[220px] lg:min-h-0">
          <RequirementCard title={t('membership.title')} text={t('membership.text')} icon={<MembershipIcon />} />
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
          <RequirementCard title={t('student.title')} text={t('student.text')} icon={<StudentIcon />} />
        </div>

        {/* Legal — bottom-right */}
        <div className="lg:col-start-3 lg:row-start-2 min-h-[220px] lg:min-h-0">
          <RequirementCard title={t('legal.title')} text={t('legal.text')} icon={<LegalIcon />} />
        </div>
      </div>
    </section>
  )
}
