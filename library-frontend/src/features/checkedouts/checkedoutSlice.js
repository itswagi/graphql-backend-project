import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../App'

const initialState = {
    books: [],
    status: 'idle',
    error: null
}

export const fetchCheckedOuts = createAsyncThunk('checkedout/fetchBooks', async () => {
    const query = gql`
        query Query {
            allCheckedOut {
                id
                book_isbn
                reader_id
                checkout_date
                returned
                returned_date
                duration
                book {
                    isbn
                    title
                    price
                    quantity
                    publisher_id
                    publisher {
                        id
                        name
                        year_publication
                    }
                }
            }
        }
    `

    const response = await client.query({ query: query})
    console.log(response.data)
    return response.data.allCheckedOut
})

const checkedoutSlice = createSlice({
    name: 'checkedout',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCheckedOuts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCheckedOuts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.books = action.payload
        },
        [fetchCheckedOuts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error
        }
    }
})

export default checkedoutSlice.reducer