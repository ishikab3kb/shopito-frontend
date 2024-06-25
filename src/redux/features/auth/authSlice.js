import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService';
import { toast } from "react-toastify"

const initialState = {
    isLoggedIn: false,
    user: null,
    isError : false,
    isSuccess : false,
    isLoading: false,
    message: "",
}

// Register user
export const register  =createAsyncThunk(
    "auth/register",
    // the user data will come from the form we  reated in the register.js
    async(userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch(error) {
            // here we are just interest in catching any possible error and in this part of the application error can come in different forms. basically different apis can return error in different ways.
            const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// login user
export const login  =createAsyncThunk(
    "auth/login",
    // the user data will come from the form we  reated in the login.js
    async(userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch(error) {
            // here we are just interest in catching any possible error and in this part of the application error can come in different forms. basically different apis can return error in different ways.
            const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// logout user
export const logout  =createAsyncThunk(
    "auth/logout",
    // since we are not snding any data so _
    async(_, thunkAPI) => {
        try {
            return await authService.logout()
        } catch(error) {
            // here we are just interest in catching any possible error and in this part of the application error can come in different forms. basically different apis can return error in different ways.
            const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// login Status user
export const getLoginStatus  =createAsyncThunk(
    "auth/getLoginStatus",
    // since we are not snding any data so _
    async(_, thunkAPI) => {
        try {
            return await authService.getLoginStatus()
        } catch(error) {
            // here we are just interest in catching any possible error and in this part of the application error can come in different forms. basically different apis can return error in different ways.
            const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// get user
export const getUser  =createAsyncThunk(
    "auth/getUser",
    // since we are not snding any data so _
    async(_, thunkAPI) => {
        try {
            return await authService.getUser()
        } catch(error) {
            // here we are just interest in catching any possible error and in this part of the application error can come in different forms. basically different apis can return error in different ways.
            const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// update user
export const updateUser  =createAsyncThunk(
    "auth/updateUser",
    async(userData, thunkAPI) => {
        try {
            return await authService.updateUser(userData)
        } catch(error) {
            // here we are just interest in catching any possible error and in this part of the application error can come in different forms. basically different apis can return error in different ways.
            const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// update user
export const updatePhoto  =createAsyncThunk(
    "auth/updatePhoto",
    async(userData, thunkAPI) => {
        try {
            return await authService.updatePhoto(userData)
        } catch(error) {
            // here we are just interest in catching any possible error and in this part of the application error can come in different forms. basically different apis can return error in different ways.
            const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
    }
  },
  // various cases:
  // either the http request is pending, that is where you have made the request but haven't got any response or is successful or fullfilled or  the http reuest fails(rejected)
  extraReducers: (builder) => {
    builder
    //register user
    .addCase(register.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // set the user. The object or response we get from the server. We'll set it to that
        state.user = action.payload;
        // after this is all done we want to throw in a notification that informs the registration was successful
        toast.success("Registration Successful")
    })
    .addCase(register.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError=true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
    })
    //login user
    .addCase(login.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // set the user. The object or response we get from the server. We'll set it to that
        state.user = action.payload;
        // after this is all done we want to throw in a notification that informs the registration was successful
        toast.success("Login Successful");
        // console.log(action.payload)
    })
    .addCase(login.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError=true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
    })

    //logout user
    .addCase(logout.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state,action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        // set the user. The object or response we get from the server. We'll set it to that
        state.user = null;
        // after this is all done we want to throw in a notification that informs the registration was successful
        toast.success(action.payload);
    })
    .addCase(logout.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError=true;
        state.message = action.payload;
        toast.error(action.payload);
    })

    //get login status
    .addCase(getLoginStatus.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(getLoginStatus.fulfilled, (state,action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        // console.log(action.payload);
        // if there is afoul play like the user has logged in but the user's token doesn't math with the backend db so the backend sends a message howing invalid FaSignature. So to handle such cases
        if(action.payload.message === "invalid signature") {
            state.isLoggedIn = false;
        }
    })
    .addCase(getLoginStatus.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError=true;
        state.message = action.payload;
    })

    //get user
    .addCase(getUser.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(getUser.fulfilled, (state,action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        // console.log(action.payload);
    })
    .addCase(getUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError=true;
        state.message = action.payload;
        toast.error(action.payload)
    })

    //update user
    .addCase(updateUser.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(updateUser.fulfilled, (state,action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("User data updated!");
        // console.log(action.payload);
    })
    .addCase(updateUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError=true;
        state.message = action.payload;
        toast.error(action.payload)
    })

    //update photo
    .addCase(updatePhoto.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(updatePhoto.fulfilled, (state,action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Profile picture updated!");
        // console.log(action.payload);
    })
    .addCase(updatePhoto.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError=true;
        state.message = action.payload;
        toast.error(action.payload)
    })
  }
});

export const {RESET_AUTH} = authSlice.actions

export default authSlice.reducer