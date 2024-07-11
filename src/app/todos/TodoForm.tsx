"use client"

import { useState } from "react"

export default function TodoForm({ add }: { add: addTodo }) {
    
    const [title, setTitle] = useState('')
    const [complete, setComplete] = useState(false)

    const submit = (e: any) => {
        e.preventDefault()
        add(title, complete)
        setTitle('')
        setComplete(false)
    }

    return (
        <form onSubmit={submit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Form</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="complete" className="block text-sm font-medium leading-6 text-gray-900">Complete</label>
                            <div className="mt-2">
                                <select
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="complete"
                                    name="complete"
                                    value={complete.toString()}
                                    onChange={e => setComplete(JSON.parse(e.target.value))}
                                >
                                    <option value="false">Belum</option>
                                    <option value="true">Sudah</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
        </form>
    )
}