'use client'
import { Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { register as registerReducer, reset } from '../features/auth/authSlice'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { getExercises } from '../features/activities/exerciseSlice'
import { useEffect } from 'react'

export default function Register() {
    const userSchema = object({
        name: string(),
        email: string().email().required('Email is required.'),
        username: string().required('Username is required.'),
        password: string().min(4).max(20).required('Password is required.'),
        confirmPassword: string().oneOf(
            [ref('password'), null],
            "Password didn't match."
        ),
    })
    const dispatch = useDispatch()
    const router = useRouter()
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            toast.success('Successfully Logged In')
            router.push('/dashboard')
            dispatch(getExercises())
        }
        dispatch(reset())
    }, [user, isSuccess, isError, message, dispatch, router])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
    })
    const handleRegister = (data) => {
        console.log(data)
        dispatch(registerReducer(data))
    }
    return (
        <main className='flex justify-center items-center m-auto py-8'>
            <div className='pt-1 pb-0 '>
                <div className='py-4 mt-8 left-0'>
                    <h4 className='font-semibold text-[#212b36]'>
                        Register Now
                    </h4>
                    <div className='flex flex-col md:flex-row justify-start items-start'>
                        <p className='text-gray-500 font-normal'>
                            Already have an account?
                        </p>
                        <Link
                            href='/login'
                            className='text-red-500 font-medium md:ml-1'
                        >
                            Log in
                        </Link>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    autoComplete='off'
                >
                    <Stack
                        className='mx-auto md:mx-0 w-10/12 min-w-fit sm:w-[450px]'
                        spacing={1.5}
                    >
                        <TextField
                            variant='outlined'
                            label='Name'
                            type='text'
                            required={false}
                            {...register('name')}
                        />
                        <span className='text-red-600 -mt-1'>
                            {errors?.name?.message}
                        </span>
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
                            label='Username'
                            type='text'
                            required={true}
                            {...register('username')}
                        />
                        <span className='text-red-600 -mt-1'>
                            {errors?.username?.message}
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
                        <TextField
                            variant='outlined'
                            label='Confirm Password'
                            type='password'
                            required={true}
                            {...register('confirmPassword')}
                        />
                        <span className='text-red-600 -mt-1'>
                            {errors?.confirmPassword?.message}
                        </span>

                        <button
                            type='submit'
                            className='block w-full bg-red-500 rounded-sm px-3 py-4 font-semibold text-sm text-white transition-all duration-200 ease-linear hover:font-medium Hover:scale-90'
                        >
                            {' '}
                            Sign up
                        </button>
                    </Stack>
                </form>
            </div>
        </main>
    )
}
