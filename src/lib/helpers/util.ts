import bcrypt from 'bcryptjs'
import * as jose from 'jose'

const saltRound = 10
const secret = "Rubicamp"

export const comparePassword = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash)

export const hashPassword = (password: string): string => bcrypt.hashSync(password, saltRound)

export const createAccessToken = async (data: any) => await new jose.SignJWT({data, type: 'accessToken'})
.setProtectedHeader({ alg: 'HS256' })
.setIssuedAt()
.setExpirationTime('1d')
.sign(new TextEncoder().encode(secret))

export const createRefreshToken = async (data: any) => await new jose.SignJWT({data, type: 'refreshToken'})
.setProtectedHeader({ alg: 'HS256' })
.setIssuedAt()
.setExpirationTime('2d')
.sign(new TextEncoder().encode(secret))

export const decodeToken = async (token: string) => await jose.jwtVerify(
    token, new TextEncoder().encode(secret)
);