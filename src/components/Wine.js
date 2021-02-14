import React, {Component} from 'react'

const Wine = (props) => {
    return(
        <div>
        <h1>{props.wine.title}</h1>
        <h4>{props.wine.description}</h4>
        <h4>{props.wine.country}</h4>
        </div>
    )
}

export default Wine 
