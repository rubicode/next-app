import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, logout } from './usersAPI'
import { setToken } from '../../api'
import Cookies from "js-cookie"

interface UserState {
    value: User,
    status: string
}

const initialState = {
    value: {
        id: '',
        email: '',
        accessToken: '',
        refreshToken: ''
    },
    status: 'idle'
} satisfies UserState as UserState


export const loginAsync = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string }) => {
        try {
            const response = await login(email, password)
            setToken(response.data.accessToken)
            Cookies.set("accessToken", response.data.accessToken, {
                expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
                path: "/",
            })
            return response.data
        }
        catch (e: any) {
            console.log(e)
            return null
        }
    }
)

export const logoutAsync = createAsyncThunk(
    'user/logout',
    async (refreshToken: string) => {
        const response = await logout(refreshToken)
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state = initialState
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'idle'
                    state.value = action.payload
                } else {
                    state.status = 'error'
                    state.value = initialState.value
                }
            })
            .addCase(loginAsync.rejected, state => {
                state.status = 'idle'
                state.value = initialState.value
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = initialState.value
            })
    }
})

export const { resetUser } = userSlice.actions

export const selectUser = (state: any) => state.user.value
export const selectStatus = (state: any) => state.user.status

export const loginUser = ({ email, password }: { email: string, password: string }) => (dispatch: any, getState: any) => {
    dispatch(loginAsync({ email, password }))
}

export const logoutUser = () => (dispatch: any, getState: any) => {
    const currentValue = selectUser(getState())
    dispatch(logoutAsync(currentValue.refreshToken))
    setToken('')
}

export default userSlice.reducer