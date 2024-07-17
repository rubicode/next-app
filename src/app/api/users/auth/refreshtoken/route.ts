import prisma from "@/lib/db/prisma"
import { createAccessToken, decodeToken } from "@/lib/helpers/util"

export async function POST(request: Request) {
    try {
        const { refreshToken } = await request.json()

        const dataToken: any = decodeToken(refreshToken)

        const user = await prisma.user.findUnique({
            where: {
                id: dataToken.data.userid,
                refreshToken
            },
        })

        if (!user) throw Error("Token Invalid")

        return Response.json({
            accessToken: createAccessToken({ userid: user.id }),
            refreshToken: user.refreshToken
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