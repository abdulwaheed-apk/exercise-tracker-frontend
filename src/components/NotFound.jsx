import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center p-10 m-auto min-h-full py-20'>
      <div className='m-auto  py-16 text-center space-y-4'>
        <h1 className='text-4xl text-red-500 font-normal font-mono'>
          Error 404! Page Not Found
        </h1>
        <button
          type='button'
          onClick={() => navigate('/')}
          className='rounded-md text-[#212b36] font-semibold bg-transparent border  border-[#919eab52] hover:border-red-500 hover:bg-red-500 hover:text-white hover:scale-110 px-10 py-3'
        >
          <BiArrowBack className='inline-block' /> Back to Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
