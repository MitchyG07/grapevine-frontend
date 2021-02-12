import React from 'react'
import Login from '../components/Login'
import {Route} from 'react-router-dom'



export default class MainContainer extends React.Component {
  
  render() {
   return (

    <Route exact path="/login" component={Login} />
  
   )
  } 
}
