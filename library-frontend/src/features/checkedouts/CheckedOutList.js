import React from 'react'
import { useSelector } from 'react-redux'

export const CheckedOutList = () => {
    const checkedouts = useSelector( state => state.checkedouts)

    const renderedCheckedOuts = checkedouts.map( checkedout => (
        <div key={checkedout.id}>
            {checkedout.id}
            {checkedout.book_isbn}
            {checkedout.reader_id}
            {checkedout.checkedout_date}
            {checkedout.returned}
            {checkedout.returned_date}
            {checkedout.duration}
        </div>
    ))

    return (
        <div className="">
            {renderedCheckedOuts}
        </div>
    )
}