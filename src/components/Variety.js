import React from 'react'

const Variety = (props) => {

    return(
        
    <div>
        <div class="reds_column" >
            <div>{props.red}</div>
        </div>
        <br/> 
        <div class="whites_column">
            <div>{props.white}</div>
        </div>
        
    </div>
    )
}

export default Variety