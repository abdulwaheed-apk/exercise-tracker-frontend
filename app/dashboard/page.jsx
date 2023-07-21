'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const { user } = useSelector((state) => state.auth)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])
    return <div className='text-black py-10 font-medium mt-10'>Dashboard</div>
}
