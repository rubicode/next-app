import prisma from "@/lib/db/prisma"


export async function GET(request: Request) {
    try {
        const todos = await prisma.todo.findMany()
        return Response.json(todos)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'load todos failed' })
    }
}

export async function POST(request: Request) {
    try {
        const { title } = await request.json()

        const todo = await prisma.todo.create({
            data: {
                title
            }
        })
        return Response.json(todo)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'creating todos failed' })
    }
}