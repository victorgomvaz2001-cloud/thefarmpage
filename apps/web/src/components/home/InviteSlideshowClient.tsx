'use client'

import Image from 'next/image'

interface Props {
  images: string[]
  alts: string[]
  activeIndex: number
  gradient?: boolean
  /** Optional object-position per image (e.g. "70% 75%" to show more right, "25% center" for more left) */
  objectPositions?: (string | undefined)[]
}

export default function InviteSlideshowClient({ images, alts, activeIndex, gradient = true, objectPositions }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={alts[i] ?? ''}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={objectPositions?.[i] ? { objectPosition: objectPositions[i] } : undefined}
          priority={false}
        />
      ))}
      {gradient && (
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      )}
    </div>
  )
}
