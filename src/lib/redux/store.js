import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todosReducer from './todos/todosSlice'

const rootReducer = combineReducers({
    todos: todosReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})