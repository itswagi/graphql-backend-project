import React from 'react'
import {useSelector} from 'react-redux'

export const PublishersList = () => {

    const publishers = useSelector( state => state.publishers)

    const renderedPublishers = publishers.map( publisher => (
        <div className="item-excerpt" key={publisher.id}>
            <span>{publisher.id}</span>
            <span>{publisher.name}</span>
            <span>{publisher.year_publication}</span>
        </div>
    ))

    return (
        <div className="item-list">
            {renderedPublishers}
        </div>
    )
}