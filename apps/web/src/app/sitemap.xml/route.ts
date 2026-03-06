const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/sitemap/xml`, { cache: 'no-store' })
    if (!res.ok) {
      return new Response('Sitemap not available', { status: 404 })
    }
    const xml = await res.text()
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return new Response('Sitemap not available', { status: 503 })
  }
}
