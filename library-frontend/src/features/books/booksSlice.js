import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {isbn: 1, title: 'First Book', price:  1.0, quantity: 1, publisher_id: 1},
    {isbn: 2, title: 'Second Book', price:  1.0, quantity: 1, publisher_id: 1}
]

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {}
})

export default booksSlice.reducer
