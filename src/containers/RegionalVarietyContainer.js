import React, {Fragment, Component, useState} from 'react'
import RegionalVariety from '../components/RegionalVariety.js'
import {Button} from "react-bootstrap"

class RegionalVarietyContainer extends Component {

    state = {
        data: [],
        currentPage: 1,
        pageSize: 10,
        variety: ''
    }

    componentDidMount(){
        this.getVariety()
    }
     
    getVariety = () =>  {
    
      const token = localStorage.token;
      fetch(`http://localhost:3000/wines/${this.props.variety}/${this.props.country}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(resp => resp.json())
      .then(data => this.setState({
         data: data
      }))
    }
  
      showTen = ()  => {
        this.setState(prevState => {
            return {currentPage: prevState.currentPage + 1}
        })} 
        
      previousTen =  () => {
        if (this.state.currentPage > 1) {
        this.setState(prevState => {
            return {currentPage: prevState.currentPage - 1}
        })} }
    

    render(){ 
        const {pageSize, currentPage} = this.state
        return(
          
            <div>
                {this.state.data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map(rv  => <RegionalVariety wine={rv} ten={this.showTen} key={rv.id} selectedWine={this.props.selectedWine}  />) }
                <Button variant='outline-dark' onClick={() => this.previousTen()}>Previous Page</Button>  
                <Button variant='outline-dark' onClick={() => this.showTen()}>Next Page</Button><br></br>
                <a className='left body'>Page: {this.state.currentPage}</a>       
            </div>
     
     
        )
    } 
}

export default RegionalVarietyContainer