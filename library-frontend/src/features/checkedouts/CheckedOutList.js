import React from 'react'
import { useSelector } from 'react-redux'

export const CheckedOutList = () => {
    const checkedouts = useSelector( state => state.checkedouts)

    const renderedCheckedOuts = checkedouts.map( checkedout => (
        <div className="item-excerpt" key={checkedout.id}>
            <span>{checkedout.id}</span>
            <span>{checkedout.book_isbn}</span>
            <span>{checkedout.reader_id}</span>
            <span>{checkedout.checkedout_date}</span>
            <span>{checkedout.returned}</span>
            <span>{checkedout.returned_date}</span>
            <span>{checkedout.duration}</span>
        </div>
    ))

    return (
        <div className="item-list">
            {renderedCheckedOuts}
        </div>
    )
}