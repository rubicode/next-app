"use client"

import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoBox() {

    const [todos, setTodos] = useState<Array<Todo>>([])

    useEffect(() => {
        setTodos([
            { id: "0", title: "makan", complete: false },
            { id: "1", title: "minum", complete: true },
            { id: "2", title: "Futsal", complete: true }
        ])
    }, [])

    const addTodo: addTodo = (title: string, complete: boolean) => {
        const id = Date.now().toString()
        setTodos([...todos, { id, title, complete }])
    }

    const removeTodo: removeTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div className="bg-white m-3 p-3 rounded-lg border-solid border-gray-400 flex flex-col">
            <div className="border-solid border-gray-500 rounded-lg p-3 text-center">
                <h1>Todo List</h1>
            </div>
            <div>
                <TodoForm add={addTodo} />
            </div>
            <TodoList todos={todos} remove={removeTodo} />
        </div>
    )
}