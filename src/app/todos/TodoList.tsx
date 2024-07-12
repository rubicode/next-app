"use client"

import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { loadTodoAsync, selectTodos } from "../../lib/redux/todos/todosSlice";
import { useEffect } from "react";

export default function TodoList() {

    const todos = useSelector(selectTodos)

    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(loadTodoAsync())
    }, [dispatch])

    const nodeList = todos.map((todo: any, index: number) => <TodoItem key={todo.id} no={index + 1} todo={todo} />)

    return (
        <div className="border-solid border-gray-500 rounded-lg p-3 flex flex-col">
            <div className="border-solid border-b-[3px] border-b-gray-600 p-3 flex flex-row">
                <div className="basis-1/4">#</div>
                <div className="basis-1/4">Title</div>
                <div className="basis-1/4">Status</div>
                <div className="basis-1/4">Actions</div>
            </div>
            {nodeList}
        </div>
    )
}