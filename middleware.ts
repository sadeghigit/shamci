import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

  const method = request.method
  const pathname = request.nextUrl.pathname
  const search = request.nextUrl.search
  const requestAt = new Date()

  if (pathname === '/api/requests' && method === 'POST')
    return NextResponse.next({ request })

  fetch(process.env.URL + '/api/requests', {
    method: 'POST',
    body: JSON.stringify({ method, pathname, search, requestAt }),
    headers: { SECRET: process.env.SECRET + "" },
  })

  return NextResponse.next({ request })
}
