import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Header from '../components/Header'
import { getExercises } from '../features/activities/exerciseSlice'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
//
function Login() {
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  // Side effects
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      toast.success('Successfully Logged In')
      navigate('/dashboard')
      dispatch(getExercises())
    }
    dispatch(reset())
  }, [user, isSuccess, isError, message, dispatch, navigate])
  // Handle Change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('formData', formData)
    // we can also send formData to login function as payload but as we had destructured above so it is good idea to make again object and all values to object instead to single input values(email and password) or formData
    const userData = {
      email: email.toLowerCase(),
      password,
    }
    dispatch(login(userData))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Header />
      <div className='max-w-2xl mx-auto bg-white pb-6 rounded-3xl drop-shadow-md mt-20'>
        <div className='pt-8 pb-0 px-6'>
          <h4 className='font-semibold text-[#212b36]'>Log in</h4>
          <div className='flex '>
            <p className='text-gray-500 font-normal mr-3'>
              Don't have an account?
            </p>
            <Link to='/register' className='text-red-500 font-medium'>
              Register
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
                <legend className='px-2 font-normal'>Email</legend>
                <input
                  type='email'
                  name='email'
                  placeholder='johan@email.com'
                  className='bg-white autofill:bg-white focus:outline-offset-1 rounded-lg block w-full text-gray-500 font-normal px-3 py-3 my-0 '
                  value={email}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className='relative border border-black border-opacity-50 focus-within:border-0 text-black text-base py-0 px-2 my-2 rounded-lg'>
                <legend className='px-2 font-normal'>Password</legend>
                <input
                  type={show ? 'text' : 'password'}
                  name='password'
                  placeholder='********'
                  className='bg-white autofill:bg-white focus:outline-offset-1 rounded-lg block w-full text-gray-500 font-normal px-3 py-3 my-0'
                  value={password}
                  onChange={handleChange}
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
                Sign In
              </button>
              <p className='text-center md:text-left py-2'>
                Create New Account or login with dummy account <br /> Email:{' '}
                <strong>dummy@gmail.com</strong> Password:{' '}
                <strong>dummy</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
