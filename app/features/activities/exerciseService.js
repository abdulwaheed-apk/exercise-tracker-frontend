import axios from 'axios'

// Create Exercise
const createExercise = async (exerciseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(
        `http://localhost:5000/api/exercises`,
        exerciseData,
        config
    )
    return response.data
}
// getExercises
const getExercises = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(
        `http://localhost:5000/api/exercises`,
        config
    )
    // console.log('response.data', response.data)
    return response.data
}
// Delete Exercise
const deleteExercise = async (exerciseId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(
        `http://localhost:5000/api/exercises/${exerciseId}`,
        config
    )
    // console.log('response.data', response.data)
    return response.data
}
// Edit-Update Exercise
const updateExercise = async (update, token) => {
    const { exerciseName, date, exerciseType, id, details, duration } = update
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const dataToUpdate = { exerciseName, exerciseType, duration, date, details }
    // console.log('Hey', dataToUpdate)
    const response = await axios.put(
        `http://localhost:5000/api/exercises/${id}`,
        dataToUpdate,
        config
    )

    console.log('response from server for update exercise', response.data)
    // localStorage.removeItem('exercise')
    return response.data
}

const exerciseService = {
    createExercise,
    getExercises,
    deleteExercise,
    updateExercise,
}
export default exerciseService