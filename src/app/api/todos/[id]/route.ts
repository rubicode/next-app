import prisma from "@/lib/db/prisma"

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const data = await request.json()

        const todo = await prisma.todo.update({
            where: {
                id,
            },
            data,
        })

        return Response.json(todo)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'updating todo failed' })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id

        const todo = await prisma.todo.delete({
            where: {
                id: id
            }
        })
        return Response.json(todo)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'deleting todo failed' })
    }
}



