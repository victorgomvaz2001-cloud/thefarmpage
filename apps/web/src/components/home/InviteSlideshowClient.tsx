'use client'

import Image from 'next/image'

interface Props {
  images: string[]
  alts: string[]
  activeIndex: number
}

export default function InviteSlideshowClient({ images, alts, activeIndex }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={alts[i] ?? ''}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={i === 0}
        />
      ))}
      {/* Gradient: blends left edge into section background */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
    </div>
  )
}
