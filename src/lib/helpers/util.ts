import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const saltRound = 10
const secret = "Rubicamp"

export const comparePassword = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash)

export const hashPassword = (password: string): string => bcrypt.hashSync(password, saltRound)

export const createAccessToken = (data: any) => jwt.sign(
    { data },
    secret,
    { expiresIn: 30 }
)

export const createRefreshToken = (data: any) => jwt.sign(
    { data },
    secret,
    { expiresIn: 60 }
)

export const decodeToken = (token: string) => jwt.verify(token, secret);