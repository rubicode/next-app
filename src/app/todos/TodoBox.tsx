import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoBox() {

    return (
        <div className="bg-white m-3 p-3 rounded-lg border-solid border-gray-400 flex flex-col">
            <div className="border-solid border-gray-500 rounded-lg p-3 text-center">
                <h1>Todo List</h1>
            </div>
            <div>
                <TodoForm />
            </div>
            <TodoList />
        </div>
    )
}