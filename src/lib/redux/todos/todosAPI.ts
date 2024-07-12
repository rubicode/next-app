import { api } from "../../api"

export const load = () => api.get('todos')

export const add = (title:string, complete:boolean) => api.post('todos', {
    title,
    complete
})

export const remove = (id:string) => api.delete(`todos/${id}`)

export const update = (id:string, title:string, complete:boolean) => api.put(`todos/${id}`, {
    title,
    complete
})