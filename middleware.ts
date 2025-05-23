import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname !== '/api/log') {
    const body = JSON.stringify({
      method: request.method,
      pathname: request.nextUrl.pathname,
      search: request.nextUrl.search,
      requestAt: new Date(),
    })
    const SECRET = process.env.SECRET + ""
    fetch(process.env.URL + `/api/log`,
      { method: 'POST', body, headers: { SECRET } })
  }

  return NextResponse.next({ request })
}
