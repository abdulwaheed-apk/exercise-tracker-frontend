import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../features/auth/authSlice'

//
const Profile = () => {
  const [formData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    newPassword: '',
  })
  const { name, username, email, password, newPassword } = formData
  const { user } = useSelector((state) => state.auth)
  // console.log('user', user)
  const handleChangeUpdate = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('got formData => ?  ', formData)
    setUserData({
      name: '',
      username: '',
      email: '',
      password: '',
      newPassword: '',
    })
  }
  return (
    <>
      <div className='flex flex-col md:flex-row p-4 relative top-10 md:top-8'>
        <form
          action=''
          method='post'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-1 w-full gap-4'>
            <label className='grid grid-cols-1 '>
              <span className='block text-sm font-medium text-slate-700'>
                Your Name
              </span>
              <input
                type='text'
                name='name'
                placeholder='Enter your new name.'
                className='mt-1 w-72 sm:w-96 block mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={name}
                onChange={handleChangeUpdate}
              />
            </label>

            <label className='grid grid-cols-1'>
              <span className='block text-sm font-medium text-slate-700'>
                Username
              </span>
              <input
                type='text'
                name='username'
                placeholder='Enter your new username.'
                className='mt-1 block w-72 sm:w-96 mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={username}
                onChange={handleChangeUpdate}
              />
            </label>

            <label className='grid grid-cols-1'>
              <span className='block text-sm font-medium text-slate-700'>
                Email
              </span>
              <input
                type='email'
                name='email'
                placeholder='Enter your new email.'
                className='mt-1 block w-72 sm:w-96 mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={email}
                onChange={handleChangeUpdate}
              />
            </label>
            <label className='grid grid-cols-1'>
              <span className='block text-sm font-medium text-slate-700'>
                Old Password
              </span>
              <input
                type='password'
                name='password'
                placeholder='Enter your old Password.'
                className='mt-1 block w-72 sm:w-96 mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={password}
                onChange={handleChangeUpdate}
              />
            </label>
            <label className='grid grid-cols-1'>
              <span className='block text-sm font-medium text-slate-700'>
                New Password
              </span>
              <input
                type='password'
                name='newPassword'
                placeholder='Create new password.'
                className='mt-1 block w-72 sm:w-96 mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={newPassword}
                onChange={handleChangeUpdate}
              />
            </label>
            <button
              type='submit'
              className='bg-red-500 rounded-lg text-xs font-semibold text-white px-4 py-3 transition-all duration-200 ease-linear  hover:animate-pulse hover:scale-105'
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Profile
