"use client"

import { useState } from "react"

export default function TodoItem({ no, todo, remove, update }: { no: number, todo: Todo, remove: removeTodo, update: updateTodo }) {

    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState(todo.title)
    const [complete, setComplete] = useState(todo.complete)

    const save = () => {
        update(todo.id, title, complete)
        setIsEdit(false)
    }

    if (isEdit) {
        return (
            <div className={no % 2 == 0 ? `bg-slate-300 p-3 flex flex-row` : `bg-slate-100 p-3 flex flex-row`}>
                <div className="basis-1/4">{no}</div>
                <div className="basis-1/4">
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="basis-1/4">
                    <select
                        value={complete.toString()}
                        onChange={e => setComplete(JSON.parse(e.target.value))}
                    >
                        <option value="false">Belum</option>
                        <option value="true">Sudah</option>
                    </select>
                </div>
                <div className="basis-1/4">
                    <button className="bg-blue-700 rounded-md text-white p-3 mr-1" onClick={() => save()}>save</button>
                    <button className="bg-yellow-700 rounded-md text-white p-3" onClick={() => setIsEdit(false)}>cancel</button>
                </div>
            </div>
        )
    } else {

        return (
            <div className={no % 2 == 0 ? `bg-slate-300 p-3 flex flex-row` : `bg-slate-100 p-3 flex flex-row`}>
                <div className="basis-1/4">{no}</div>
                <div className="basis-1/4">{todo.title}</div>
                <div className="basis-1/4">{todo.complete ? 'sudah' : 'belum'}</div>
                <div className="basis-1/4">
                    <button className="bg-green-700 rounded-md text-white p-3 mr-1" onClick={() => setIsEdit(true)}>edit</button>
                    <button className="bg-red-700 rounded-md text-white p-3" onClick={() => remove(todo.id)}>delete</button>
                </div>
            </div>
        )
    }
}