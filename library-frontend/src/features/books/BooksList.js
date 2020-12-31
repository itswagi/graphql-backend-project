import React from 'react'
import { useSelector } from 'react-redux'

export const BooksList = () => {
    const books = useSelector(state => state.books)

    const renderedBooks = books.map( book => (
        <div className="" key={books.isbn}>
            <h2>{book.isbn}</h2>
            <h2>{book.title}</h2>
            <h2>{book.price}</h2>
            <h2>{book.quantity}</h2>
            <h2>{book.publisher_id}</h2>
        </div>
    ))

    return (
        <div className="">
            {renderedBooks}
        </div>
    )

}