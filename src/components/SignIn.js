import React from 'react'

const SignIn = (props) => {

    handleSubmit = (e) => {
        e.preventDefault()
        let configObj = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username, password})
        }
        fetch('http://localhost:3000/users',configObj)
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem('token',data.jwt)
            props.handleLogin(data.user)
        }) 
        setUsername("")
        setPassword("") 
    }

    
    return(
        <div> 
        </div> 
    )
}

export default SignIn 