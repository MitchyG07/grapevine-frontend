import React from 'react'


function Login (props){

    return(

        <div>
        <form>
          <label for="fname">First name:</label>
          <input type="text" id="fname" name="fname"/>
          <label for="lname"> Last name:</label> 
          <input type="text" id="lname" name="lname"/>
        </form> 
        </div>

    )

}

export default Login 