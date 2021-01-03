import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice'
import publishersReducer from '../features/publishers/publishersSlice'
import checkedoutReducer from '../features/checkedouts/checkedoutSlice'
import loginReducer from '../features/Login/loginSlice'

export default configureStore({
  reducer: {
    books: booksReducer,
    publishers: publishersReducer,
    checkedouts: checkedoutReducer,
    login: loginReducer,
  },
});
