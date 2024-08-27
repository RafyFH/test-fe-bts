import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
      startApp: false,
      isLoggedIn: true,
      user: user,
    }
  : {
      startApp: true,
      isLoggedIn: false,
      user: null,
      // user: [],
    };
    export const loginUser = createAsyncThunk('auth/login', async (param, thunkAPI) => {
        try {
          const response = await axios.post('http://94.74.86.174:8080/api/login', 
            {
                username: param.username,
                password: param.password,
            },
            {
              headers: {
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
              },
            }
          );
      
          if (response.status === 200) {
            console.log(response.status);
            const responseJson = response.data;
            
            return responseJson;
          }
        } catch (error) {
          console.error('Login failed', error);
          return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
        }
      });
  export const registerUser = createAsyncThunk('auth/register', async (param, thunkAPI) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + param.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(param.data),
    }
    let response = await fetch(`http://94.74.86.174:8080/api/register`, requestOptions)
    if (response.status === 200) {
      const responseJson = await response.json()
      return responseJson
    }
    if (response.status === 400) {
      
    }
  })
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = []
      state.isLoggedIn = false
      state.startApp = true
      // const navigate = useNavigate()
      localStorage.clear()
      if (localStorage.getItem('user') === null) {
        // navigate('#/login')
        // console.log('test bung')
        window.location.href = '/login'
      }
    },
  }, 

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload === null) {
            state.isLoggedIn = false
            state.startApp = false
          } else {
            state.isLoggedIn = true
            state.startApp = false
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
          }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;