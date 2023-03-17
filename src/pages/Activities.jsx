import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiEdit } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'
import {
  reset,
  createExercise,
  getExercises,
  updateExercise,
  deleteExercise,
} from '../features/activities/exerciseSlice'

let calledOnce = true

//
const Activities = () => {
  const [formData, setFormData] = useState({
    exerciseName: '',
    exerciseType: 'Running',
    duration: '',
    date: '',
    details: '',
  })
  const [update, setUpdate] = useState({
    exerciseName: '',
    exerciseType: '',
    duration: '',
    date: '',
    details: '',
    id: '',
  })
  const { exerciseName, exerciseType, duration, date, details } = formData

  const { exercises, isSuccess } = useSelector((state) => state.exercises)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  // ** Create exercise Side Effects */
  useEffect(() => {
    if (isSuccess || calledOnce) {
      dispatch(getExercises())
    }

    calledOnce = false
  }, [isSuccess, update.id])

  // console.log('To Update', updateExercise)
  // ** Handle Change */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // ** handle change for update */
  const handleChangeUpdate = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // ** Handle Edit */
  const handleEdit = (exercise) => {
    // const exerciseId = exercise._id
    const { exerciseName, exerciseType, duration, date, details, _id } =
      exercise
    setUpdate({
      exerciseName: exerciseName,
      exerciseType: exerciseType,
      duration: duration,
      date: new Date(date).toISOString().slice(0, 10),
      details: details,
      id: _id,
    })
    // console.log(' my index ---', index)
  }

  // ** Handle Submit */
  const handleSubmit = (e) => {
    e.preventDefault()
    const exerciseData = {
      exerciseName,
      exerciseType,
      duration,
      date,
      details,
    }
    dispatch(createExercise(exerciseData))
    setFormData({
      exerciseName: '',
      exerciseType: '',
      duration: '',
      date: '',
      details: '',
    })
  }
  //**  Handle Update */
  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateExercise(update))
    // dispatch(reset())
    setUpdate({
      exerciseName: '',
      exerciseType: '',
      duration: '',
      date: '',
      details: '',
      id: '',
    })
  }

  //
  return (
    <>
      {/* sm:ml-64 */}
      <section className='flex flex-col p-4 mx-auto bg-white relative top-8'>
        <form
          action=''
          method='post'
          className=' bg-white rounded-2xl drop-shadow-md px-4 py-8'
          onSubmit={update.id ? handleUpdate : handleSubmit}
          autoComplete='off'
        >
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Exercise Name
              </span>
              <input
                type='text'
                name='exerciseName'
                placeholder='Morning walk for 5 KM'
                className='mt-1 block w-full mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={update.id ? update.exerciseName : exerciseName}
                //handleChangeUpdate
                onChange={update.id ? handleChangeUpdate : handleChange}
              />
            </label>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Exercise Type
              </span>
              <select
                name='exerciseType'
                className='mt-1 block w-full mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={update.id ? update.exerciseType : exerciseType}
                onChange={update.id ? handleChangeUpdate : handleChange}
              >
                <option value='Running'>Running</option>
                <option value='Swimming'>Swimming</option>
                <option value='Bicycling'>Bicycling</option>
                <option value='Walking'>Walking</option>
                <option value='Hiking'>Hiking</option>
              </select>
            </label>
          </div>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Date
              </span>
              <input
                type='date'
                name='date'
                value={update.id ? update.date : date}
                onChange={update.id ? handleChangeUpdate : handleChange}
                className='mt-1 block w-full mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
              />
            </label>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Duration (minutes)
              </span>
              <input
                type='text'
                name='duration'
                value={update.id ? update.duration : duration}
                onChange={update.id ? handleChangeUpdate : handleChange}
                placeholder='30'
                className='mt-1 block w-full mb-4 p-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
              />
            </label>
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Details
              </span>
              <textarea
                name='details'
                cols='30'
                rows='3'
                className='mt-1 block w-full mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={update.id ? update.details : details}
                onChange={update.id ? handleChangeUpdate : handleChange}
              ></textarea>
            </label>
          </div>
          <button
            type='submit'
            className='bg-red-500 rounded-lg p-2 text-white w-full md:w-auto font-semibold flex-none capitalize'
          >
            {update.id ? 'Update exercise' : 'Add new exercise'}
            <i className='fa-solid fa-plus font-semibold text-lg'></i>
          </button>
        </form>
        {/* <!-- Stats Sections --> */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-4'>
          {exercises.length > 0
            ? exercises.map((exercise) => (
                <div
                  className='bg-gradient-to-tr from-[#444444] to-[#2a2a2a] rounded-2xl drop-shadow-md text-white min-w-96 max-w-md py-5 px-4'
                  key={exercise._id}
                >
                  <div className='flex  items-center justify-between max-h-6  '>
                    <p className='font-semibold text-xl bg-white rounded text-[#212B36] px-2'>
                      {exercise.exerciseType}
                    </p>
                    <div className='ml-auto mr-0 '>
                      <button
                        type='button'
                        className='mx-1 '
                        onClick={() => {
                          if (
                            window.confirm(
                              `Want to delete ${exercise.exerciseName} ?`
                            )
                          ) {
                            dispatch(deleteExercise(exercise._id))
                          }
                        }}
                      >
                        <FaTrash className='hover:text-red-500' />
                      </button>
                      <button
                        type='button'
                        className='mx-1'
                        onClick={() => {
                          handleEdit(exercise)
                          scrollTo(0, 0)
                        }}
                      >
                        <FiEdit />
                      </button>
                    </div>
                  </div>
                  <div className='border-t-2 my-2 pt-5 border-[#E8EAED]'>
                    <h4 className='font-semibold text-xl -mt-3'>
                      {exercise.exerciseName}
                    </h4>
                    <p className='font-light text-base italic'>
                      {' '}
                      {exercise.duration} minutes
                    </p>
                    <p className='font-normal text-base text-gray-300'>
                      {exercise.details}
                    </p>
                    <p className='font-light text-base mt-2'>
                      {new Date(exercise.date).toISOString().slice(0, 10)}
                    </p>
                  </div>
                </div>
              ))
            : 'You do not have any exercise Kindly add new exercise'}
        </section>
      </section>
    </>
  )
}

export default Activities
