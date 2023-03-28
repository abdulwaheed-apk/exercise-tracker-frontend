import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Header from '../components/Header'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

//
function Register() {
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })
  const { name, email, username, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      toast.success('Registration Successful, Welcome to the Dashboard')
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, dispatch, navigate])
  // Handle Change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('formData', formData)
    const userData = {
      name,
      email,
      password,
      username,
    }
    dispatch(register(userData))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Header />
      <main className='max-w-2xl mx-auto bg-white mt-10 pb-6 rounded-3xl drop-shadow-md mb-8'>
        <div className='pt-8 pb-0 px-6'>
          <h4 className='font-semibold text-[#212b36]'>Sign up</h4>
          <div className='flex '>
            <p className='text-gray-500 font-normal mr-3'>
              Already have an account?
            </p>
            <Link to='/login' className='text-red-500 font-medium'>
              Log in
            </Link>
          </div>
        </div>
        <div className='pt-1 pb-0 px-6'>
          <form
            action=''
            method='post'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <div>
              <fieldset className='border border-black border-opacity-50 focus-within:border-0 text-black text-base py-0 px-2 my-2 rounded-lg'>
                <legend className='px-2 font-normal'>Full Name</legend>
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={handleChange}
                  placeholder='Johan Doe'
                  className='bg-white autofill:bg-white focus:outline-offset-1 rounded-lg block w-full text-gray-500 font-normal px-3 py-3 my-0'
                />
              </fieldset>
              <fieldset className='border border-black border-opacity-50 focus-within:border-0 text-black text-base py-0 px-2 my-2 rounded-lg'>
                <legend className='px-2 font-normal'>Email</legend>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  placeholder='johan@email.com'
                  className='bg-white autofill:bg-white focus:outline-offset-1 rounded-lg block w-full text-gray-500 font-normal px-3 py-3 my-0'
                />
              </fieldset>
              <fieldset className='border border-black border-opacity-50 focus-within:border-0 text-black text-base py-0 px-2 my-2 rounded-lg'>
                <legend className='px-2 font-normal'>Username</legend>
                <input
                  type='text'
                  name='username'
                  value={username}
                  onChange={handleChange}
                  placeholder='johan'
                  className='bg-white autofill:bg-white focus:outline-offset-1 rounded-lg block w-full text-gray-500 font-normal px-3 py-3 my-0'
                  autofill='false'
                />
              </fieldset>
              <fieldset className='relative border border-black border-opacity-50 focus-within:border-0 text-black text-base py-0 px-2 my-2 rounded-lg'>
                <legend className='px-2 font-normal'>Create Password</legend>
                <input
                  type={show ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={handleChange}
                  placeholder='********'
                  className='bg-white autofill:bg-white focus:outline-offset-1 rounded-lg block w-full text-gray-500 font-normal px-3 py-3 my-0'
                />
                <span className='absolute right-4 top-1/4 text-gray-900 text-xl'>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation()
                      setShow(!show)
                    }}
                  >
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </span>
              </fieldset>

              <button
                type='submit'
                className='block w-full bg-red-500 rounded-lg px-3 py-4 font-semibold text-sm text-white transition-all duration-200 ease-linear hover:font-medium Hover:scale-90'
              >
                Sign Up
              </button>
              <p className='text-center md:text-left py-2'>
                Create New Account or login with dummy account <br /> Email:{' '}
                <strong>dummy@gmail.com</strong> Password:{' '}
                <strong>dummy</strong>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Register
