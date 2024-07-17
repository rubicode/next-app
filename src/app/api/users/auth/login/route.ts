import prisma from "@/lib/db/prisma"
import { comparePassword, createAccessToken, createRefreshToken } from "@/lib/helpers/util"

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const user = await prisma.user.findUnique({
            where: {
                email
            },
        })

        if (!(user && comparePassword(password, user.password))) throw Error("email or password wrong")

        const refreshToken = createRefreshToken({ userid: user.id })

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        })

        return Response.json({
            email: user.email,
            accessToken: createAccessToken({ userid: user.id }),
            refreshToken
        })
    } catch (error: any) {
        console.log(error)
        return Response.json({
            message: error.message
        }, {
            status: 401
        })
    }
}