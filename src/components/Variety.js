import React from 'react'
import { Link } from 'react-router-dom';

const Variety = (props) => {

    return(

    <div>
        <div class="reds_column" >
            <div  onClick={() => {props.getVarietyCount(props.red); props.getVariety(props.red) }} >
                {props.red}
            </div> 
        </div>
        <br/> 
        <div class="redWine">
            <div onClick={() =>  {props.getVarietyCount(props.white); props.getVariety(props.white)}} >
                {props.white}
            </div>
        </div>
        
    </div>
    )
}

export default Variety