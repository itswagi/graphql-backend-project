import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCheckedOuts } from './checkedoutSlice'

export const CheckedOutList = () => {
    const checkedouts = useSelector( state => state.checkedouts.books)
    const dispatch = useDispatch()
    const loginStatus = useSelector( state => state.login.loggedIn)
    const checkedOutStatus = useSelector( state => state.checkedouts.status)

    useEffect( () => {
        if( checkedOutStatus === 'idle' && loginStatus === true){
            dispatch(fetchCheckedOuts())
        }
    }, [checkedOutStatus, loginStatus, dispatch])

    const renderedCheckedOuts = checkedouts.map( checkedout => 
    (
        <div className="item-excerpt" key={checkedout.id}>
            <span>{checkedout.id}</span>
            <span>{checkedout.book_isbn}</span>
            <span>{checkedout.reader_id}</span>
            <span>{checkedout.checkedout_date}</span>
            <span>{checkedout.returned}</span>
            <span>{checkedout.returned_date}</span>
            <span>{checkedout.duration}</span>
        </div>
    )
    )

    return (
        <div className="item-list">
            {renderedCheckedOuts}
        </div>
    )
}