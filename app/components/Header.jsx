'use client'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { resetExercises } from '../features/activities/exerciseSlice'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Header = () => {
    const [toggle, setToggle] = useState(false)
    const [isTransparent, setIsTransparent] = useState(true)
    const [isUser, setIsUser] = useState(null)
    const dispatch = useDispatch()
    // const { user } = useSelector((state) => state.auth)
    const { exercises } = useSelector((state) => state.exercises)

    const router = useRouter()
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsTransparent(false)
        } else {
            setIsTransparent(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    useEffect(() => {
        // Lazy load the authSlice on the client-side
        import('../features/auth/authSlice').then((authSlice) => {
            const user = authSlice.getUserFromLocalStorage()
            // Your code using 'user' variable here
            setIsUser(user)
        })
    }, [])
    const handleClick = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(resetExercises())
        router.push('/')
    }
    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition ease-in-out duration-300 py-4 px-4 md:px-24 border-b border-[#E8EAED] max-h-20 ${
                    isTransparent ? ' bg-white' : 'bg-opacity-95 bg-white'
                }`}
            >
                <nav className='w-full mx-auto flex justify-between items-center overflow-hidden'>
                    <h2 className='flex-none sm:flex-auto'>
                        <Link
                            href='/'
                            className='text-red-500 font-semibold sm:text-2xl text-lg'
                        >
                            Exercise Tracker
                        </Link>
                    </h2>

                    <ul
                        className={`flex-none ${
                            toggle ? 'flex' : 'hidden md:flex'
                        } my-auto ml-auto`}
                    >
                        {isUser ? (
                            <>
                                <li className='rounded max-w-max py-1 px-1 md:px-4 text-black'>
                                    <Link
                                        href='/dashboard'
                                        className='font-medium hover:text-red-500'
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className='rounded max-w-max py-1 px-1 md:px-4 text-black'>
                                    <button
                                        onClick={handleClick}
                                        className='font-medium hover:text-red-500'
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='rounded max-w-max py-1 px-1 md:px-4 text-black'>
                                    <Link
                                        href='/login'
                                        className='font-medium hover:text-red-500'
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className='rounded max-w-max py-1 px-1 md:px-4 text-black'>
                                    <Link
                                        href='/register'
                                        className='font-medium  hover:text-red-500'
                                    >
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <button type='button' className='inline-block md:hidden'>
                        {' '}
                        <MoreVertIcon
                            onClick={() => setToggle(!toggle)}
                            className='text-red-500 text-xl'
                        />
                    </button>
                </nav>
            </header>
        </>
    )
}

export default Header
