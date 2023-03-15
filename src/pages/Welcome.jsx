import { FaClock, FaFire, FaRoad } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

//
const Welcome = () => {
  const [quote, setQuote] = useState({
    text: '',
    author: '',
  })
  const { user } = useSelector((state) => state.auth)
  const { exercises } = useSelector((state) => state.exercises)
  const navigate = useNavigate()

  const { name } = user // parent user object is user state coming from store and child user is coming from server( on login request we are sending back token, user, and message)
  // console.log(user.name)
  let timeInMinutes = 0
  exercises.forEach((item) => {
    timeInMinutes += item.duration
  })
  let timeInHours = (timeInMinutes / 60).toFixed(2)

  useEffect(() => {
    async function getQuote() {
      const response = await fetch('https://type.fit/api/quotes')
      var dataFetched = await response.json()
      const index = Math.floor(Math.random() * 1000)
      setQuote({
        text: dataFetched[index].text,
        author: dataFetched[index].author,
      })
      // console.log('dataFetched --> text ', dataFetched[index].text)
      // console.log('dataFetched --> author ', dataFetched[index].author)
    }

    getQuote()
  }, [])
  const handleActivity = () => {
    console.log(
      exercises.filter((item) => item.exerciseType == 'Swimming').length
    )
  }
  return (
    <>
      <section className='flex-auto px-4 pt-11 md:pt-8 bg-white'>
        <div className='bg-[#f2f3f5] rounded-2xl h-auto md:h-80 max-w-4xl px-8 py-8 md:py-16'>
          <p className='font-semibold text-xl md:text-2xl'>Welcome! {name}</p>
          <div className='font-medium text-sm my-4'>
            <p>{quote.text}</p>
            <p className='mt-2 italic text-xl'>By: {quote.author}</p>
          </div>
          <button
            type='button'
            className='bg-red-500 rounded-lg text-xs font-semibold text-white px-4 py-2 transition-all duration-200 ease-linear  hover:animate-pulse hover:scale-105'
            onClick={() => navigate('/dashboard/activities')}
          >
            Add New Exercise
          </button>
        </div>

        <section className='grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 px-4'>
          {/* <!-- Time card --> */}
          <div className='bg-white rounded-2xl drop-shadow-md max-w-xs max-h-36 my-1 px-4 py-4  '>
            <h4 className='font-semibold text-sm my-2 text-center'>
              Total Hours Of Exercise Activities
            </h4>
            <div className='flex justify-around items-center my-1'>
              <p className='font-semibold text-3xl '>{timeInHours}</p>
              <p className='font-bold text-3xl'></p>
              <p>
                <FaClock className='text-4xl text-cyan-900 transition-all duration-200 ease-linear hover:font-medium hover:animate-pulse hover:scale-105' />
              </p>
            </div>
          </div>
          {/* <!-- Distance Card --> */}
          <div className='bg-white rounded-2xl drop-shadow-md max-w-xs max-h-36 my-1 px-4 py-4'>
            <h4 className='font-semibold text-sm my-2 text-center'>
              Total Distance Covered
            </h4>
            <div className='flex justify-around items-center my-1'>
              <p className='font-semibold text-3xl'>900 KM</p>
              <p className='font-bold text-3xl'></p>
              <p>
                <FaRoad className='text-amber-900 text-4xl transition-all duration-200 ease-linear  hover:animate-pulse hover:scale-105 hover:font-medium' />
              </p>
            </div>
          </div>
          {/* <!-- Calories Card --> */}
          <div className='bg-white rounded-2xl drop-shadow-md max-w-xs max-h-36 my-1 px-4 py-4'>
            <h4 className='font-semibold text-sm my-2 text-center'>
              Today's Calories Burned
            </h4>
            <div className='flex justify-around items-center my-1'>
              <p className='font-semibold text-3xl '>300 Calories</p>
              <p className='font-bold text-3xl'></p>
              <p>
                <FaFire className='text-4xl text-red-500 transition-all duration-200 ease-linear  hover:animate-pulse hover:scale-105 hover:font-medium' />
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Welcome
