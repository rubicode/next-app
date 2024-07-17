import prisma from "@/lib/db/prisma"

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const data = await request.json()

        const user = await prisma.user.update({
            where: {
                id,
            },
            data,
        })

        return Response.json(user)
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

        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return Response.json(user)
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'deleting user failed' })
    }
}



