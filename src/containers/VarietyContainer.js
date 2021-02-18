import React, {Component} from 'react'
import Variety from '../components/Variety'
import { WorldMap } from "react-svg-worldmap"
import Country from '../components/Country'

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
        'Montepulcia', 
        'Petite Syrah'
    ],
    whiteVarieties: [
        'Chardonnay',
        'Sauvignon Blanc',
        'Pinot Gris',
        'Riesling',
        'Pinot Noir',
        'Semillon',
        'Gewurztraminer',
        'Chenin Blanc',
        'Gruner Veltliner',
        'Torrontes'
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
    
    // selectedVariety = (variety) => {
    //     this.setState({
    //         variety: variety
    //     })
    //     this.getVarietalData(variety)
    //   }

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
            <main className="background">
            <Container fluid='true'>
            <Row> 
            <Col className="redColumn">
                {redVarieties.map(red => <Variety red={red} getVarietyCount={this.getVarietyCount} getVariety={getVariety} />)}
            </Col>
            <Col xs={7} className="worldMap">
                <WorldMap color="blue" backgroundColor="" value-suffix="wines" size="xxl" data={this.state.wines} /> 
            </Col>
            <Col>
                {whiteVarieties.map(white => <Variety white={white} getVarietyCount={this.getVarietyCount} getVariety={getVariety}/>)}
            </Col>
            </Row>
            <Row>
                {
                country_data[1]
                ? country_data.map(country => <Country country={country} getCountry={getCountry} /> ) 
                : <div>Country map </div>
                }
            </Row>
        </Container>
        </main> 
        )
    }
}     

export default VarietyContainer