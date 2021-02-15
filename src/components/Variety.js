import React from 'react'

const Variety = (props) => {

    return(

    <div>
        <div class="redWine" >
            <div>{props.red}</div>
        </div>
        <br/> 
        <div class="redWine">
            <div>{props.white}</div>
        </div>
        
    </div>
    )
}

export default Variety