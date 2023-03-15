import { useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  // console.log('user', user)
  const [name, setName] = useState(user.name)

  return (
    <>
      <div className='p-5'>
        <form action='' method='post' autoComplete='off'>
          <label className='block'>
            <span className='block text-sm font-medium text-slate-700'>
              Full Name
            </span>
            <input
              type='text'
              name='name'
              placeholder='Edit Your Name'
              className='mt-1 block w-full mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
              value={name}
              //handleChangeUpdate
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </form>
      </div>
    </>
  )
}

export default Profile
