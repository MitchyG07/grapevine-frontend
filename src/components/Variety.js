import React from 'react'
import { Link } from 'react-router-dom';

const Variety = (props) => {



    return(
        
    <div>
        <div class="reds_column" >
            <div  onClick={() =>  props.getVariety(props.red)} ><Link className='body' to='/regionalvariety'> {props.red}</Link></div> 
        </div>
        <br/> 
        <div class="whites_column">
            <div>{props.white}</div>
        </div>
        
    </div>
    )
}

export default Variety