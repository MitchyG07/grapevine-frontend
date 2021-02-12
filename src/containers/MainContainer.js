import React from 'react'
import Login from '../components/Login'
import {Route} from 'react-router-dom'
import WineContainer from '../containers/WineContainer'



export default class MainContainer extends React.Component {

  state = {
    wines: [] 
  }

  componentDidMount() {
    this.getWines()
  }

  getWines = () => {
    fetch('http://localhost:3000/wines/5000')
    .then(resp => resp.json())
    .then(wines => this.setState({
      wines: wines
    }))
  }
  
  render() {
   return (
    <div>
    <Route exact path="/login" component={Login} />,
    <Route exact path="/wine" render={() => { 
      return <WineContainer wines={this.state.wines} />
      }
    } />
    </div>
   )
  } 
}
