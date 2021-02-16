import React, {Component} from 'react'
import Variety from '../components/Variety'
import { WorldMap } from "react-svg-worldmap"

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
        'Sauvignon blanc',
        'Pinot Gris',
        'Riesling',
        'Pinot Noir',
        'Semillon',
        'Gewurztraminer',
        'Chenin Blanc',
        'Gruner Veltliner',
        'Torrontes'
    ],
    country: '', 
    wines: [], 
    data: [],
    selectedVariety: '',
    selectedCountry: '',
    }


    componentDidMount() {
        this.getVarietyCount()
    }

    getVarietyCount = () => {
        const token = localStorage.token;
        fetch("http://localhost:3000/varietal_count", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(resp => resp.json())
        .then(data => this.setState({
          wines: data
        }))
      }

      selectedVariety = (variety) => {
        this.setState({
            selectedVariety: variety
        })
        this.getVarietalData(variety)
      }

    getVarietalData = (variety) => {
        let data = this.state.wines.find(wine => wine.varietal === variety)
        this.setState({
            data: data.isoCodes
        })
    }

    clickAction = (countryName) => {
        this.setState({
            selectedCountry: countryName
        })
    }

    render(){ 
        console.log(this.state)

        const {redVarieties, whiteVarieties, country} = this.state 
        
        return(
            <div>
                <div className="worldMap">
                    <WorldMap onClick={() => this.clickAction} color="red" title="GrapeVine Map" value-suffix="people" size="lg" data={this.state.data} /> 
                </div>
                <div className="redColumn">
                    {redVarieties.map(red => <Variety red={red} selectedVariety={this.selectedVariety}/>)}
                </div>
                <div>
                    {whiteVarieties.map(white => <Variety white={white} selectedVariety={this.selectedVariety}/>)}
                </div>
            </div>
        )
    }
}     

export default VarietyContainer