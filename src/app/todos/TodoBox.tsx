"use client"

import { useDispatch } from "react-redux";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { logoutUser } from "@/lib/redux/users/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function TodoBox() {

    const dispatch: any = useDispatch()
    const router = useRouter()

    const logout = () => {
        dispatch(logoutUser())
        Cookies.remove("accessToken");
        router.push('/')
    }

    return (
        <div className="bg-white m-3 p-3 rounded-lg border-solid border-gray-400 flex flex-col">
            <div className="border-solid border-gray-500 rounded-lg p-3 text-center">
                <h1>Todo List</h1>
            </div>
            <div>
                <TodoForm />
            </div>
            <TodoList />
            <button className="bg-red-600 rounded-lg text-white p-3" onClick={logout}>Logout</button>
        </div>
    )
}