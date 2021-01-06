import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../App'

const initialState = {
    loggedIn: false, 
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

export const authSignUp = createAsyncThunk('Auth/SignUp', async (name, email, password, phone, address) => {
    console.log(name, email, password, phone, address)
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