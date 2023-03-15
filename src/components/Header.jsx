import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useState } from 'react'
const Header = () => {
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  // Handle Click
  const handleClick = () => {
    dispatch(logout())
    dispatch(reset)
    navigate('/')
  }
  return (
    <>
      <header className='sticky z-40 top-0 right-0 left-0 py-4 px-4 border-b border-[#E8EAED] max-h-20 bg-white shadow-sm rounded-b max-w-7xl mx-auto'>
        <nav className='max-w-7xl mx-auto flex justify-between items-center overflow-hidden'>
          <h2 className='flex-none sm:flex-auto'>
            <Link
              to='/'
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
            {user ? (
              <>
                <li className='rounded max-w-max py-1 px-1 md:px-4 text-black'>
                  <Link
                    to='/dashboard'
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
                  <Link to='/login' className='font-medium hover:text-red-500'>
                    Login
                  </Link>
                </li>
                <li className='rounded max-w-max py-1 px-1 md:px-4 text-black'>
                  <Link
                    to='/register'
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
            <BsThreeDotsVertical
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
