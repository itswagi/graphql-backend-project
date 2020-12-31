import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice'
import publishersReducer from '../features/publishers/publishersSlice'

export default configureStore({
  reducer: {
    books: booksReducer,
    publishers: publishersReducer
  },
});
