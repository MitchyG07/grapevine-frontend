import React from 'react'

const Review = (props) => {
    return (
        <div className='body'>- {props.review.content}</div>
    )
}

export default Review