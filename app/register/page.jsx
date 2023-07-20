'use client'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { register as registerReducer } from '../features/auth/authSlice'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function Register() {
    const userSchema = object({
        name: string().required('Name is required.'),
        email: string().email().required('Email is required.'),
        username: string().required('Username is required.'),
        password: string().min(4).max(20).required('Password is required.'),
        confirmPassword: string().oneOf(
            [ref('password'), null],
            "Password didn't match."
        ),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
    })
    const dispatch = useDispatch()
    const handleRegister = (data) => {
        console.log(data)
        toast.success('Hello World')
        dispatch(registerReducer(data))
    }
    return (
        <main className='flex justify-center items-center m-auto py-8'>
            <div className='pt-1 pb-0 '>
                <div className='py-4 mt-8 left-0'>
                    <h4 className='font-semibold text-[#212b36]'>Sign In</h4>
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
                            required={true}
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
                        <Button
                            type='submit'
                            variant='contained'
                            color='error'
                            size='large'
                        >
                            Sign up{' '}
                        </Button>
                    </Stack>
                </form>
            </div>
        </main>
    )
}
