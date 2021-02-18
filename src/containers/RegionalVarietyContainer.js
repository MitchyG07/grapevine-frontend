import React, {Fragment, Component, useState} from 'react'
import RegionalVariety from '../components/RegionalVariety.js'
import {Button, Container, Row, Image,  Col} from "react-bootstrap"
import grape from '../images/grape1.jpg'

class RegionalVarietyContainer extends Component {

    state = {
        data: [],
        currentPage: 0,
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

      filterWines = (e) => {
        e.preventDefault()
        // debugger
        console.log(e.target.children[0].value)  
        this.setState(prevState => { 
              return {data: prevState.data.filter(wines => wines.title.includes(e.target.children[0].value)) } 
         } )  
      }
    

    render(){ 
        const {pageSize, currentPage} = this.state
        return(
          
            <Container className='regional-container' fluid='true'>
                <Row> 
                <form onSubmit={(e) => this.filterWines(e)}> 
                <input name='filter-wine' placeholder='...search'></input>
                <Button className='p-2' type='submit' value='Submit' variant='outline-dark'>Search</Button>
          
                <Button variant='outline-dark' onClick={() => this.getVariety()}>Reset</Button>
                </form>
                </Row>
                <Row> 
               
                <Col> 
                    {this.state.data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map(rv  => <RegionalVariety wine={rv} ten={this.showTen} key={rv.id} selectedWine={this.props.selectedWine}  />) }
                    <Button variant='outline-dark' onClick={() => this.previousTen()}>Previous Page</Button>  
                    <Button variant='outline-dark' onClick={() => this.showTen()}>Next Page</Button><br></br>
                    <a className='left body'>Page: {this.state.currentPage + 1}</a>  
                </Col>
                <Col> 
                    <Image className='grape-img img-rounded'src={grape} alt='grape' roundedCircle thumbnail/>
                </Col>
                </Row>
            </Container>
     
     
        )
    } 
}

export default RegionalVarietyContainer