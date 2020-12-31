import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {id: 1, name: 'Publisher 1', year_publication: 2020},
    {id: 2, name: 'Publisher 1', year_publication: 2021}
]

const publishersSlice = createSlice({
    name: 'publishers',
    initialState,
    reducers: {}
})

export default publishersSlice.reducer