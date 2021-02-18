import React, {Component} from 'react'
import Variety from '../components/Variety'
import { WorldMap } from "react-svg-worldmap"
import Country from '../components/Country'
import {Table, ListGroup, Container, Row, Col, Button, Form} from 'react-bootstrap'

const URLS = [
    "http://localhost:3000/varietal_count",
    "http://localhost:3000/country_count"
];


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

    componentDidMount() {
        this.getVarietyCount()
    } 

    getVarietyCount = () => {
        const token = localStorage.token;
        const configObj ={
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }  
        Promise.all(URLS.map(url => fetch(url, configObj)
            .then(resp => resp.json())
        ))
            .then(data => {
                console.log(data)
                const data_iso = data[0]
                const data_country = data[1]
                this.setState({
                    wines: data_iso, 
                    countries: data_country
            })
         })
      }
    
    selectedVariety = (variety) => {
        this.setState({
            variety: variety
        })
        this.getVarietalData(variety)
      }

    getVarietalData = (variety) => {
        let data = this.state.wines.find(wine => wine.varietal === variety)
        let countries = this.state.countries.find(wine => wine.varietal === variety)
        this.setState({
            data: data.isoCodes,
            country_data: countries.countries
        })
    }

    render(){ 
        console.log(this.state)

        const {redVarieties, whiteVarieties, country_data} = this.state 
        const {getCountry, getVariety} = this.props
        
        return(
<<<<<<< HEAD
           
            <Container fluid='true'>
                <Row> 
                <Col className="redColumn">
=======
            <div>
                <div className="worldMap">
                    <WorldMap color="blue" backgroundColor="#cc1c8e4"title="GrapeVine Map" value-suffix="wines" size="xl" data={this.state.data} /> 
                </div>
                <div className="redColumn">
>>>>>>> finishing-wine-show
                    {redVarieties.map(red => <Variety red={red} getVariety={getVariety} selectedVariety={this.selectedVariety}/>)}
                </Col>
                <Col xs={7} className="worldMap">
                    <WorldMap color="blue" title="GrapeVine Map" value-suffix="wines" size="responsive" data={this.state.data} /> 
                </Col>
                <Col>
                    {whiteVarieties.map(white => <Variety white={white} selectedVariety={this.selectedVariety}/>)}
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
        )
    }
}     

export default VarietyContainer