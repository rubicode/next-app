import prisma from "@/lib/db/prisma"
import { createAccessToken, createRefreshToken } from "@/lib/helpers/util"

export async function POST(request: Request) {
    try {
        const { email, password, repassword } = await request.json()

        if(password !== repassword) throw Error("password doesn't match")

        const checkUser = await prisma.user.findUnique({
            where: {
                email
            },
        })

        if(checkUser) throw Error("email already exist")

        const user = await prisma.user.createUser(email, password)

        const refreshToken = await createRefreshToken({ userid: user.id })

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
            accessToken: await createAccessToken({ userid: user.id }),
            refreshToken
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