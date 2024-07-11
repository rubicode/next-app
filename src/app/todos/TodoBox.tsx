"use client"

import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoBox() {

    const [todos, setTodos] = useState<Array<Todo>>([])

    useEffect(() => {
        loadTodo()
    }, [])

    const loadTodo: loadTodo = async () => {
        const response = await fetch('/api/todos')
        const json = await response.json()
        setTodos(json)
    }

    const addTodo: addTodo = async (title: string, complete: boolean) => {
        const response = await fetch('/api/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, complete }),
        })
        const json = await response.json()
        setTodos([...todos, { ...json }])
    }

    const removeTodo: removeTodo = async (id: string) => {
        const response = await fetch(`/api/todos/${id}`, {
            method: "DELETE"
        })
        const json = await response.json()
        setTodos(todos.filter(todo => todo.id !== json.id))
    }

    const updateTodo: updateTodo = async (id: string, title: string, complete: boolean) => {
        const response = await fetch(`/api/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, complete })
        })
        const json = await response.json()
        setTodos(todos.map(todo => {
            if (todo.id == json.id) {
                todo.title = json.title
                todo.complete = json.complete
            }
            return todo
        }))
    }

    return (
        <div className="bg-white m-3 p-3 rounded-lg border-solid border-gray-400 flex flex-col">
            <div className="border-solid border-gray-500 rounded-lg p-3 text-center">
                <h1>Todo List</h1>
            </div>
            <div>
                <TodoForm add={addTodo} />
            </div>
            <TodoList todos={todos} remove={removeTodo} update={updateTodo} />
        </div>
    )
}