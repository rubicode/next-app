import prisma from "@/lib/db/prisma"

export async function GET(request: Request) {
    try {
        const users = await prisma.user.findMany()
        return Response.json(users)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'load users failed' })
    }
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const user = await prisma.user.createUser(email, password)
        return Response.json(user)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'creating users failed' })
    }
}