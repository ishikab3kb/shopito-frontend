// it will have code to http request to which we will call to make call to the backend
import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`


// register user
// this function will have some data that it will send to backend
const register = async(userData) => {
    const response = await axios.post(API_URL+"register", userData, {
        withCredentials: true,
    })
    return response.data
}

// login user
const login = async(userData) => {
    const response = await axios.post(API_URL+"login",userData)
    // we already specifrid credentials to be tru in app.js so we don't need to do it further for every http request
    return response.data
}

// logout user
const logout = async() => {
    const response = await axios.get(API_URL+"logout")
    // we already specifrid credentials to be tru in app.js so we don't need to do it further for every http request
    // we are being specific here and sending the message from response.data as its what we did in the backend when logging out
    return response.data.message;
}

// get login status
const getLoginStatus = async() => {
    const response = await axios.get(API_URL+"getLoginStatus")
    // we already specifrid credentials to be tru in app.js so we don't need to do it further for every http request
    // we are being specific here and sending the message from response.data as its what we did in the backend when logging out
    return response.data;
}

// get user
const getUser = async() => {
    const response = await axios.get(API_URL+"getUser")
    // we already specifrid credentials to be tru in app.js so we don't need to do it further for every http request
   
    return response.data;
}

// Update user
const updateUser = async(userData) => {
    const response = await axios.patch(API_URL+"updateUser", userData,{
        withCredentials: true,
    })
    // we already specifrid credentials to be tru in app.js so we don't need to do it further for every http request
    
    return response.data;
}

// update photo
const updatePhoto = async(userData) => {
    const response = await axios.patch(API_URL+"updatePhoto", userData)
    // we already specifrid credentials to be tru in app.js so we don't need to do it further for every http request
    // we are being specific here and sending the message from response.data as its what we did in the backend when logging out
    return response.data;
}

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    updatePhoto
}

export default authService