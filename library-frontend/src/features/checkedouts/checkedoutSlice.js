import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {id: 1, book_isbn: 1, reader_id: 1, checkedout_date: 'Today', returned: 'false', returned_date: 'Today', duration: 1},
    {id: 2, book_isbn: 2, reader_id: 1, checkedout_date: 'Today', returned: 'false', returned_date: 'Today', duration: 1}
]

const checkedoutSlice = createSlice({
    name: 'checkedout',
    initialState,
    reducers: {}
})

export default checkedoutSlice.reducer