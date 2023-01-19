//file that connects the backend -API
import axios from 'axios'

const api = axios.create({
    baseURL:'http://127.0.0.1:3000/api'
})

//routes for pirates
export const insertPirate = payload => api.post('/pirate', payload)
export const checkCaptain = payload => api.post('/pirate/captain', payload)
export const updatePirateById = (id,payload) =>api.put(`/pirate/${id}`,payload)
export const getAllPirates = () =>api.get('/pirates')
export const getPirateById = id =>api.get(`/pirate/${id}`)
export const deletePirateById = id =>api.delete(`/pirate/${id}`)

//routes for user module
export const registerUser = payload=>api.post('/auth/register',payload)
export const loginUser = payload=>api.post('/auth/sign_in',payload)
export const getUserProfile = () =>api.get(`/user/profile/`)

const apis = {insertPirate,getAllPirates,checkCaptain,getPirateById,updatePirateById,deletePirateById,registerUser,loginUser,getUserProfile}

export default apis