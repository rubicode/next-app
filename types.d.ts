declare interface Todo {
    id: string
    title: string
    complete: boolean
    sent?: boolean
}

declare interface User {
    id: string
    email: string
    password?: string
    accessToken?: string
    refreshToken?: string
}