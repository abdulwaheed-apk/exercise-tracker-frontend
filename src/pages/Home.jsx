import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
function Home() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * 1600)
    async function quoteMachine() {
      const response = await axios.get('https://type.fit/api/quotes')
      const getQuote = await response.data[randomIndex]
      setQuote(getQuote.text)
      // console.log('response check', getQuote.text)
      // console.log('response check', getQuote.author)
    }
    quoteMachine()
  }, [])
  // Your physical health is just as important as your mental health.
  return (
    <>
      <Header />
      <main className='container max-w-7xl xl:pt-40 py-16 px-4 mx-auto flex flex-col-reverse md:flex-row justify-between items-center'>
        <div>
          <h1 className='font-bold normal-case text-4xl md:text-6xl max-w-xl leading-tight tracking-tight mb-2'>
            Let us manage and track your activities, you
            <span className='text-red-500'> Focus On Keep Going</span>.
          </h1>
          <h4 className='my-4 font-semibold text-gray-500 italic'>{quote}</h4>
          <div className='my-4 py-6'>
            <Link
              to='/login'
              className='rounded-md text-[#212b36] font-semibold bg-transparent border  border-[#919eab52] hover:border-red-500 hover:bg-red-500 hover:text-white hover:scale-110 px-10 py-3 transition-all duration-200 ease-linear  hover:animate-pulse  hover:font-medium'
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className='w-11/12 lg:w-1/2 lg:pl-12'>
          <div className='max-w-lg  md:ml-auto'>
            <img src='/workout.svg' alt='Activity Tracker' />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
