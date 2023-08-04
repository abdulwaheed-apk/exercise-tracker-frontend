'use client'
import Image from 'next/image'
import Link from 'next/link'
import workoutImg from '../public/workout.svg'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'


export default function Home() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['quotes'],
        queryFn: () => axios.get('https://type.fit/api/quotes').then((res) => res.data)
    })

    if (error) return 'An error has occurred: ' + error.message

    let randomIndex = Math.floor(Math.random() * 20)

    return (
        <main className='container max-w-7xl xl:pt-40 pt-4 pb-8 px-4 mx-auto flex flex-col-reverse md:flex-row justify-between items-center'>
            <div>
                <h1 className='font-bold normal-case text-4xl md:text-6xl max-w-xl leading-tight tracking-tight mb-2'>
                    Let us manage and track your activities, you
                    <span className='text-red-500'> Focus On Keep Going</span>.
                </h1>
                <h4 className='my-4 font-semibold text-gray-500 italic'>
                    {isLoading ? 'Loading...' : data[randomIndex]?.text}
                </h4>
                <div className='my-4 py-6'>
                    <Link
                        href='/login'
                        className='rounded-md text-[#212b36] font-semibold bg-transparent border  border-[#212b36] hover:border-red-500 hover:bg-red-500 hover:text-white hover:scale-110 px-10 py-3 transition-all duration-200 ease-linear  hover:font-medium'
                    >
                        Get Started
                    </Link>
                </div>
            </div>
            <div className='w-11/12 lg:w-1/2 lg:pl-12'>
                <div className='max-w-lg  md:ml-auto'>
                    <Image src={workoutImg} alt='Activity Tracker' />
                </div>
            </div>
        </main>
    )
}
