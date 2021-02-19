import React, {Component} from 'react'
import Variety from '../components/Variety'
import { WorldMap } from "react-svg-worldmap"
import Country from '../components/Country'
import Jumbotron from 'react-bootstrap/Jumbotron'

import {Table, ListGroup, Container, Row, Col, Button, Form} from 'react-bootstrap'

class VarietyContainer extends Component {

    state = {
    redVarieties: [
        'Cabernet Sauvignon', 
        'Pinot Noir',  
        'Merlot', 
        'Malbec', 
        'Syrah',
        'Grenache',
        'Sangiovese', 
        'Tempranillo',
    ],
    whiteVarieties: [
        'Chardonnay',
        'Sauvignon Blanc',
        'Pinot Gris',
        'Riesling',
        'Torrontés',
        'Chenin Blanc',
        'Vidal Blanc',
        'Pinot Grigio'
    ],
    countries: [], 
    wines: [], 
    data: [], 
    country_data: [],
    variety: '',
    selectedCountry: '',
    }

    // componentDidMount() {
    //     this.getCountryCount()
    // } 

    getVarietyCount = (variety) => {
        const url = [
            `http://localhost:3000/varietal_count/${variety}`,
        ];
        const token = localStorage.token;
        const configObj ={
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }  
            fetch(url, configObj)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    wines: data.isoCodes, 
            })
         })
         this.getCountryCount(variety)
      }

      getCountryCount = (variety) => {
        const token = localStorage.token;
        const configObj ={
            headers: {
                Authorization: `Bearer ${token}`,
            }}
        fetch(`http://localhost:3000/country_count/${variety}`, configObj)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                    country_data: data.countries
                })
            })
    }
    
    selectedVariety = (variety) => {
        this.setState({
            variety: variety
        })
      }

    // getVarietalData = (variety) => {
    //     let countries = this.state.countries.find(wine => wine.varietal === variety)
    //     this.setState({
    //         country_data: countries.countries
    //     })
    

    render(){ 
        console.log(this.state)

        const {redVarieties, whiteVarieties, country_data} = this.state 
        const {getCountry, getVariety} = this.props
        
        return(
            <Container className="background" fluid='true'>
            <Row className='m-2'> 
            <Col align='center'>
            <h4 className='body mb-5'>Red Varietals</h4>
                {redVarieties.map(red => <Variety red={red} getVarietyCount={this.getVarietyCount} getVariety={getVariety} selectedVariety={this.selectedVariety}/>)}
            </Col>
            <Col xs={6} className="worldMap" align='center'>
                <WorldMap color="blue" backgroundColor="" value-suffix="wines" size="responsive" data={this.state.wines} /> 
            </Col>
            <Col align='center'>
            <h4 className='body mb-3'>White Varietals</h4>
                {whiteVarieties.map(white => <Variety white={white} getVarietyCount={this.getVarietyCount} getVariety={getVariety} selectedVariety={this.selectedVariety}/>)}
            </Col>
            </Row>
            <Row>
                <Col align="center">
                {
                country_data[1] ?
                <h5 class='body'>Where in the world are you drinking {this.state.variety}?</h5>
                : <div></div> 
                }{
                country_data[1] ? 
                country_data.map(country => <Country country={country} getCountry={getCountry} variety={this.state.variety}/> )
                : <div></div>
                }
                </Col> 
            </Row>
        </Container>
        )
    }
}     

export default VarietyContainer