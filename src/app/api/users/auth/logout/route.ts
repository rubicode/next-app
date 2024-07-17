import prisma from "@/lib/db/prisma"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const refreshToken = searchParams.get('refreshToken')

        await prisma.user.updateMany({
            where: {
                refreshToken
            },
            data: {
                refreshToken: null
            }
        })

        return Response.json({
            message: "logout is successful"
        })
    } catch (error: any) {
        console.log(error)
        return Response.json({
            message: error.message
        }, {
            status: 400
        })
    }
}