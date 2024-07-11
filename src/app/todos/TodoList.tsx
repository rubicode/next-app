import TodoItem from "./TodoItem";

export default function TodoList({ todos, remove, update }: { todos: Todo[], remove: removeTodo, update: updateTodo }) {

    const nodeList = todos.map((todo, index) => <TodoItem key={todo.id} no={index + 1} todo={todo} remove={remove} update={update} />)

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