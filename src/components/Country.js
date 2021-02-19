import React, {Component} from 'react'
import {Link} from 'react-router-dom'


const Country = (props) => {

    return (
        <div onClick={() => props.getCountry(props.country["country"])}>
        <Link className='body' to='/regionalvariety'>{props.country["country"]} - {props.country["value"]} </Link>
        </div>
    )
    
}

export default Country