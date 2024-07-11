import { redirect } from 'next/navigation'

export default function Page({ params }: { params: { username: string } }) {

    if(params.username === 'iqbal'){
        redirect('/users')
    }
    
    return <div>User: {params.username}</div>
}