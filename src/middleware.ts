import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeToken } from './lib/helpers/util'

const privateAPI = [
    '/api/todos',
    '/api/users'
]

export async function middleware(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken')?.value

    if (request.nextUrl.pathname.startsWith('/todos')) {
        if (accessToken) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }

    }

    if (privateAPI.includes(request.nextUrl.pathname)) {
        try {
            const authorization: string = request.headers.get('Authorization') || ''
            const token = authorization.slice(7)
            const decoded = await decodeToken(token)
            if (decoded.payload.type !== "accessToken") throw Error("token is not valid")
            return NextResponse.next()
        } catch (e) {
            return NextResponse.json({ error: 'token is not valid' }, { status: 500 })
        }
    }
}