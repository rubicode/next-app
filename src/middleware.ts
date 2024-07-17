import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeToken } from './lib/helpers/util'

const privateAPI = [
    '/api/todos',
    '/api/users'
]

export function middleware(request: NextRequest) {

    // const currentUser = request.cookies.get('currentUser')?.value

    // if (currentUser && !request.nextUrl.pathname.startsWith('/todos')) {
    //     return NextResponse.rewrite(new URL('/', request.url))
    // }

    if (privateAPI.includes(request.nextUrl.pathname)) {
        try {
            const authorization: string = request.headers.get('Authorization') || ''
            const token = authorization.slice(7)
            console.log('masuk sini', authorization, token)
            const decoded = decodeToken(token)
            return NextResponse.next();
        } catch (e) {
            console.log(e)
            return NextResponse.json({ error: 'token is not valid' }, { status: 500 })
        }
    }
}