declare interface Todo {
    id: string
    title: string
    complete: boolean,
}

declare type addTodo = (title: string, complete: boolean) => void;

declare type removeTodo = (id: string) => void;