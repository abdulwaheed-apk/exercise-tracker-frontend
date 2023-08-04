'use client'
import { Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { getExercises } from '../features/activities/exerciseSlice'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Login() {
    const router = useRouter()
    console.log('router', router)
    const userSchema = object({
        email: string().email().required('Email is required.'),
        password: string().min(4).max(20).required('Password is required.'),
    })
    const { user } = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema), })
    if (user) {
        console.log('user', user)
        router.push('/dashboard')
    }
    const loginMutation = useMutation((data) => axios.post(`${API_URL}/users/login`, data),
        {
            onMutate: (variables) => {
                // console.log('Mutation started', variables)
            },
            onSuccess: (res) => {
                console.log('Mutation succeeded', res)
                toast.success(`Welcome ${res.data.name}!, ${res.data.message}`)
                localStorage.setItem('user', JSON.stringify(res.data.token))
                router.push('/dashboard')
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            },
        }
    )

    const handleRegister = (data) => {
        loginMutation.mutate(data)
    }
    return (
        <main className='flex justify-center items-center m-auto py-8'>
            <div className='pt-1 pb-0 '>
                <div className='py-8  left-0'>
                    <h4 className='font-semibold text-[#212b36]'>Login</h4>
                    <div className='flex flex-col md:flex-row justify-start items-start'>
                        <p className='text-gray-500 font-normal'>
                            Do not have any account?
                        </p>
                        <Link
                            href='/register'
                            className='text-red-500 font-medium md:ml-1'
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    autoComplete='off'
                >
                    <Stack
                        className='mx-auto md:mx-0 w-10/12 min-w-fit sm:w-[450px]'
                        spacing={2}
                    >
                        <TextField
                            variant='outlined'
                            label='Email'
                            type='email'
                            required={true}
                            {...register('email')}
                        />
                        <span className='text-red-600 -mt-1'>
                            {errors?.email?.message}
                        </span>

                        <TextField
                            variant='outlined'
                            label='Password'
                            type='password'
                            required={true}
                            {...register('password')}
                        />
                        <span className='text-red-600 -mt-1'>
                            {errors?.password?.message}
                        </span>

                        <button
                            type='submit'
                            className='block w-full bg-red-500 rounded-[4px] px-3 py-4 font-semibold text-md text-white transition-all duration-200 ease-linear hover:font-medium Hover:scale-90'
                        >
                            {' '}
                            Sign In
                        </button>
                    </Stack>
                </form>
            </div>
        </main>
    )
}
