import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { deleteExercise } from '../features/activities/exerciseSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

//
const ExerciseByType = () => {
  const { exercises, isLoading } = useSelector((state) => state.exercises)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // flex flex-col md:flex-row flex-wrap justify-evenly
  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading Exercises')
    }
  }, [exercises, isLoading])
  return (
    <>
      <section className='flex flex-col p-4 mx-auto bg-white relative top-8'>
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
                      className='bg-gradient-to-tr from-[#444444] to-[#2a2a2a] rounded-2xl drop-shadow-md text-white max-w-md min-w-fit py-5 px-4'
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
                              }
                            }}
                          >
                            <FaTrash />
                          </button>
                          <button
                            type='button'
                            className='mx-1'
                            onClick={() => navigate('/dashboard/activities')}
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
