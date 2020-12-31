import React from 'react'
import {useSelector} from 'react-redux'

export const PublishersList = () => {

    const publishers = useSelector( state => state.publishers)

    const renderedPublishers = publishers.map( publisher => (
        <div className="" key={publisher.id}>
            {publisher.id}
            {publisher.name}
            {publisher.year_publication}
        </div>
    ))

    return (
        <div className="">
            {renderedPublishers}
        </div>
    )
}