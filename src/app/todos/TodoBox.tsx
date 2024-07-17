"use client"

import { useDispatch, useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { logoutUser, selectUser } from "@/lib/redux/users/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TodoBox() {

    const user = useSelector(selectUser)
    const dispatch: any = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (!user.refreshToken) {
            router.push('/')
        }
    }, [user])

    return (
        <div className="bg-white m-3 p-3 rounded-lg border-solid border-gray-400 flex flex-col">
            <div className="border-solid border-gray-500 rounded-lg p-3 text-center">
                <h1>Todo List</h1>
            </div>
            <div>
                <TodoForm />
            </div>
            <TodoList />
            <button className="bg-red-600 rounded-lg text-white p-3" onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    )
}