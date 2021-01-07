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
            <div>{checkedout.book.title}</div>
            <div>{checkedout.book.publisher.name}</div>
            <div>{checkedout.checkout_date}</div>
            <div>{checkedout.duration}</div>
            <div>{String(checkedout.returned)}</div>
            <div>{checkedout.returned_date}</div>
        </div>
    )
    )

    return (
        
        <div className="item-list">
            <div className="item-header">
                <div>Title</div>
                <div>Publisher</div>
                <div>Checked Out Date</div>
                <div>Duration</div>
                <div>Returned</div>
                <div>Returned Date</div>
            </div>
            {renderedCheckedOuts}
        </div>
        
    )
}