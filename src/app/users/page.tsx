'use client'

import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()

    return (
        <>
            <h2>ini adalah halaman users</h2>
            <button className="bg-black text-white rounded-lg p-3" onClick={() => router.push('/home')}>Kembali ke Home</button>
        </>
    )
}