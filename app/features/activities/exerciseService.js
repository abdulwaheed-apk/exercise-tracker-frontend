import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Create Exercise
const createExercise = async (exerciseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(
        `${API_URL}/exercises`,
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
    const response = await axios.get(`${API_URL}/exercises`, config)
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
        `${API_URL}/exercises/${exerciseId}`,
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
        `${API_URL}/exercises/${id}`,
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
