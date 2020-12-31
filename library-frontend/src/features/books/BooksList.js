import React from 'react'
import { useSelector } from 'react-redux'

export const BooksList = () => {
    const books = useSelector(state => state.books)

    const renderedBooks = books.map( book => (
        <div className="books-excerpt" key={book.isbn}>
            {book.isbn}
            {book.title}
            {book.price}
            {book.quantity}
            {book.publisher_id}
        </div>
    ))

    return (
        <div className="books-list">
            {renderedBooks}
        </div>
    )

}