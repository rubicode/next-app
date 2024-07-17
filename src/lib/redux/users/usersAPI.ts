import { api } from "../../api";

export const login = (email: string, password: string) => api.post('users/auth/login', {
    email,
    password
})

export const logout = (refreshToken: string) => api.get('users/auth/logout', {
    params: {
        refreshToken
    }
})