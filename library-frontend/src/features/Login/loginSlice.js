import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    token: null
}

const loginSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers: {}
})

export default loginSlice.reducer