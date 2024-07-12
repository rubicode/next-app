import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { load, add, remove, update } from './todosAPI'

interface TodosState {
    value: Todo[],
    status: string
}

const initialState = { value: [], status: 'idle' } satisfies TodosState as TodosState

export const loadTodoAsync = createAsyncThunk(
    'todos/load',
    async () => {
        const response = await load()
        return response.data
    }
)

export const addTodoAsync = createAsyncThunk(
    'todos/add',
    async ({ id, title, complete }: { id: string, title: string, complete: boolean }) => {
        const response = await add(title, complete)
        return { id, todo: response.data }
    }
)

export const resendTodoAsync = createAsyncThunk(
    'todos/resend',
    async ({ id, title, complete }: { id: string, title: string, complete: boolean }) => {
        const response = await add(title, complete)
        return { id, todo: response.data }
    }
)

export const removeTodoAsync = createAsyncThunk(
    'todos/remove',
    async (id: string) => {
        const response = await remove(id)
        return response.data
    }
)

export const updateTodoAsync = createAsyncThunk(
    'todos/update',
    async ({ id, title, complete }: { id: string, title: string, complete: boolean }) => {
        const response = await update(id, title, complete)
        return response.data
    }
)

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.value.push({
                id: action.payload._id,
                title: action.payload.title,
                complete: false,
                sent: true
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadTodoAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(loadTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = action.payload.map((item: Todo) => {
                    item.sent = true
                    return item
                })
            })
            .addCase(loadTodoAsync.rejected, state => {
                state.status = 'idle'
                state.value = []
            })
            .addCase(addTodoAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.map(item => {
                    if (item.id === action.payload.id) {
                        item.id = action.payload.todo.id
                    }
                    return item
                })
            }).addCase(addTodoAsync.rejected, (state, action: any) => {
                state.status = 'idle'
                state.value = state.value.map(item => {
                    if (item.id === action.payload.id) {
                        item.sent = false
                    }
                    return item
                })
            })
            .addCase(resendTodoAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(resendTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.map(item => {
                    if (item.id === action.payload.id) {
                        item.id = action.payload.todo.id
                        item.sent = true
                    }
                    return item
                })
            })
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.filter(todo => todo.id !== action.payload.id)
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.map(todo => {
                    if (todo.id === action.payload.id) {
                        todo.title = action.payload.title
                        todo.complete = action.payload.complete
                    }
                    return todo
                })
            })
    }
})

export const { addTodo } = todosSlice.actions

export const selectTodos = (state: any) => state.todos.value

export const createTodo = (title: string, complete: boolean) => (dispatch: any) => {
    const id = Date.now().toString()
    dispatch(addTodo({ id, title, complete }))
    dispatch(addTodoAsync({ id, title, complete }))
}

export default todosSlice.reducer