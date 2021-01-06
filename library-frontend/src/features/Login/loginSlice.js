import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../App'

const initialState = {
    loggedIn: localStorage.getItem('token') !== null ? true: false, 
    status: 'idle',
    error: null,
}

export const authLogin = createAsyncThunk('Auth/login', async (values) => {
    const email = values[0]
    const password = values[1]
    const login = gql`
        mutation Mutation($loginEmail: String!, $loginPassword: String!) {
            login(email: $loginEmail, password: $loginPassword) {
                token
            }
        }
    `
    const response = await client.mutate({ mutation: login, variables: { loginEmail: email, loginPassword: password} })
    return response.data.login
})

export const authSignUp = createAsyncThunk('Auth/SignUp', async (values) => {
    const signup = gql`
        mutation Mutation($signupEmail: String!, $signupPassword: String!, $signupName: String!, $signupAddress: String!, $signupPhone: String!) {
            signup(email: $signupEmail, password: $signupPassword, name: $signupName, address: $signupAddress, phone: $signupPhone) {
                token
            }
        }
    `
    const response = await client.mutate({ mutation: signup, variables: { signupName: values[0], signupEmail: values[1], signupPassword: values[2],signupPhone: values[3], signupAddress: values[4]}})
    console.log(response)
    return response.data.signup
})

const loginSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers: {
        logout (state) {
            state.loggedIn = false
            state.status = 'idle'
            localStorage.removeItem('token')
        }
    },
    extraReducers: {
        [authLogin.pending]: (state, action) => {
            state.status = 'loading'
        },
        [authLogin.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            const { token } = action.payload
            state.loggedIn = true
            state.error = null
            localStorage.setItem('token', token);
        },
        [authLogin.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error
        },
        [authSignUp.pending]: (state, action) => {
            state.status = 'loading'
        },
        [authSignUp.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload)
            const { token } = action.payload
            state.loggedIn = true
            state.error = null
            localStorage.setItem('token', token)
        },
        [authSignUp.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error
        }
    }
})

export const { logout } = loginSlice.actions

export default loginSlice.reducer