import React, {Component} from 'react'
import { Link } from 'react-router-dom';


const RegionalVariety = (props) => {
    return(
       <div>
      
        <h4 onClick={() => props.selectedWine(props.wine)}> <Link className='body' to='/wine'> {props.wine.title}</Link> </h4>
        <h5>Rating: {props.wine.points} | Country: {props.wine.country} </h5>
        </div>
    )
}

export default RegionalVariety