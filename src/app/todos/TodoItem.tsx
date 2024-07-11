export default function TodoItem({ no, todo, remove }: { no: number, todo: Todo, remove: removeTodo }) {
    return (
        <div className={no % 2 == 0 ? `bg-slate-300 p-3 flex flex-row` : `bg-slate-100 p-3 flex flex-row`}>
            <div className="basis-1/4">{no}</div>
            <div className="basis-1/4">{todo.title}</div>
            <div className="basis-1/4">{todo.complete ? 'sudah' : 'belum'}</div>
            <div className="basis-1/4">
                <button className="bg-red-700 rounded-md text-white p-3" onClick={() => remove(todo.id)}>delete</button>
            </div>
        </div>
    )
}