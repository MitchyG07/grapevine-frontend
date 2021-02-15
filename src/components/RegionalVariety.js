import React, {Component} from 'react'
import { Link } from 'react-router-dom';


const RegionalVariety = (props) => {
    return(
       
        <h4 onClick={() => props.selectedWine(props.wine)}> <Link className='body' to='/wine'> {props.wine.title} </Link> </h4>
    
    )
}

export default RegionalVariety