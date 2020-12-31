import React from 'react'
import { useSelector } from 'react-redux'

export const BooksList = () => {
    const books = useSelector(state => state.books)

    const renderedBooks = books.map( book => (
        <div className="item-excerpt" key={book.isbn}>
            <span>{book.isbn}</span>
            <span>{book.title}</span>
            <span>{book.price}</span>
            <span>{book.quantity}</span>
            <span>{book.publisher_id}</span>
        </div>
    ))

    return (
        <div className="item-list">
            {renderedBooks}
        </div>
    )

}