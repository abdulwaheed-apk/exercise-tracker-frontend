import { NavLink } from 'react-router-dom'
import sidebarMenu from '../pages/data'
import {
  AiOutlineClose,
  AiOutlineBars,
  AiOutlineBarChart,
} from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'

//
const Sidebar = () => {
  const [toggle, setToggle] = useState(false)

  const { user } = useSelector((state) => state.auth)

  const { name, username } = user // parent user object is user state coming from store and child user is coming from server( on login request we are sending back token, user, and message)
  // console.log(name)
  // console.log(username)

  return (
    <>
      <button
        className='fixed z-50 left-0 block md:hidden ml-4 my-2'
        onClick={() => setToggle(!toggle)}
      >
        {!toggle ? (
          <AiOutlineBars className=' h-8 w-8 text-red-500' />
        ) : (
          <AiOutlineClose className=' h-8 w-8 text-red-500' />
        )}
      </button>{' '}
      <aside
        className={`${
          !toggle ? 'hidden' : 'inline-block'
        } md:inline-block  absolute z-30 md:sticky top-6 md:top-16 left-0 bg-white shadow-lg h-screen w-64 px-4`}
      >
        <nav>
          <div className='block md:hidden rounded-xl mx-auto my-2 '>
            {' '}
            {/* <button>
              <AiOutlineClose className=' h-8 w-8 text-red-500' />
            </button>{' '} */}
          </div>
          <div className='bg-[#F2F3F5] w-56 mx-auto h-20 rounded-xl flex justify-around items-center px-4 my-5'>
            <img src='/vite.svg' alt='avatar' className='w-14 rounded-full' />
            <div>
              <h4 className='font-medium text-base'>{name}</h4>
              <h6 className='font-normal text-xs'>{username}</h6>
            </div>
          </div>
          <ul className='space-y-2 mt-2'>
            {sidebarMenu.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? ' bg-red-500 text-white flex items-center h-12 w-56 mx-auto rounded-md'
                      : 'bg-[#f2f3f5] flex items-center h-12 w-56 mx-auto rounded-lg transition-all duration-200 ease-linear hover:font-medium hover:animate-pulse hover:scale-105'
                  }
                >
                  <span className='w-1/3 grid place-items-end mr-2'>
                    {' '}
                    {<item.icon />}{' '}
                  </span>{' '}
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

// onClick={
//   window.location.pathname == `/${item.path}`
//      setIsActive(!isActive)
//     : null
// }

// flex items-center h-12 w-56 mx-auto rounded-lg
