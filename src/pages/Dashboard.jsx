import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

//
function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  return (
    <>
      <Header />
      {/* grid grid-cols-6 place-items-start */}
      <section className='flex justify-center md:justify-start items-start gap-4 max-w-7xl mx-auto relative'>
        <Sidebar />
        <section className='bg-white '>
          {/* col-span-5 md:col-span-4 */}
          <Outlet />
        </section>
      </section>
    </>
  )
}

export default Dashboard
