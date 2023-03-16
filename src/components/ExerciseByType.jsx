import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import {
  deleteExercise,
  createExercise,
  updateExercise,
  getExercises,
} from '../features/activities/exerciseSlice'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

let calledOnce = true

//
const ExerciseByType = () => {
  const [update, setUpdate] = useState({
    exerciseName: '',
    exerciseType: '',
    duration: '',
    date: '',
    details: '',
    id: '',
  })
  const { exercises, isSuccess } = useSelector((state) => state.exercises)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess || calledOnce) {
      dispatch(getExercises())
    }

    calledOnce = false
  }, [isSuccess, update.id])
  // ** handle change for update */
  const handleChangeUpdate = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // ** Handle Edit */
  const handleEdit = (exercise) => {
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
  }

  // ** Handle Submit */

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
  return (
    <>
      <section className='flex flex-col p-4 mx-auto bg-white relative top-8'>
        <form
          action=''
          method='post'
          className={` ${
            update.id ? 'block' : 'hidden'
          } bg-white rounded-2xl drop-shadow-md px-4 py-8`}
          onSubmit={update.id && handleUpdate}
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
                value={update.id && update.exerciseName}
                onChange={update.id && handleChangeUpdate}
              />
            </label>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Exercise Type
              </span>
              <select
                name='exerciseType'
                className='mt-1 block w-full mb-4 px-3 py-3 bg-white border border-[#212b36] rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                value={update.id && update.exerciseType}
                onChange={update.id && handleChangeUpdate}
              >
                <option value='Swimming'>Swimming</option>
                <option value='Running'>Running</option>
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
                value={update.id && update.date}
                onChange={update.id && handleChangeUpdate}
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
                value={update.id && update.duration}
                onChange={update.id && handleChangeUpdate}
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
                value={update.id && update.details}
                onChange={update.id && handleChangeUpdate}
              ></textarea>
            </label>
          </div>
          <button
            type='submit'
            className='bg-red-500 rounded-lg p-2 text-white w-full md:w-auto font-semibold flex-none capitalize'
          >
            {update.id && 'Update exercise'}
          </button>
        </form>
        <section className='grid grid-cols-1 place-items-start lg:grid-cols-2  gap-4 py-8'>
          {exercises.length > 0
            ? exercises.map((exercise) => (
                <Fragment key={exercise._id}>
                  {exercise.exerciseType.toLowerCase() &&
                  window.location.pathname.endsWith(
                    exercise.exerciseType.toLowerCase()
                  ) &&
                  exercise.exerciseType ? (
                    <div
                      className='bg-gradient-to-tr from-[#444444] to-[#2a2a2a] rounded-2xl drop-shadow-md text-white min-w-96 max-w-md min-w-fit py-5 px-4'
                      key={exercise._id}
                    >
                      <div className='flex  items-center justify-between max-h-6  '>
                        <p className='font-semibold text-xl bg-white rounded text-[#212B36] px-2'>
                          {exercise.exerciseType}
                        </p>
                        <div className='ml-auto mr-0 '>
                          <button
                            type='button'
                            className='mx-1'
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Want to delete ${exercise.exerciseName} ?`
                                )
                              ) {
                                dispatch(deleteExercise(exercise._id))
                                setUpdate({
                                  id: null,
                                })
                              }
                            }}
                          >
                            <FaTrash />
                          </button>
                          <button
                            type='button'
                            className='mx-1'
                            onClick={() => handleEdit(exercise)}
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
                  ) : null}
                </Fragment>
              ))
            : 'You do not have any exercise in this category Kindly add new exercise'}
        </section>
      </section>
    </>
  )
}

export default ExerciseByType
