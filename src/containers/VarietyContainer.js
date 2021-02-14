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
    country: ''
    }

    componentDidMount() {
        this.getWines()
    }

    getWines = () => {
        const token = localStorage.token;
        fetch("http://localhost:3000/wines/5000", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(resp => resp.json())
        .then(data => this.setState({
          wines: data
        }))
      }

    render(){ 
        console.log(this.state)
        const {redVarieties, whiteVarieties, country} = this.state 
        const data =
        [
          { country: "cn", value: 1389618778 }, // china
          { country: "in", value: 1311559204 }, // india
          { country: "us", value: 331883986 },  // united states
          { country: "id", value: 264935824 },  // indonesia
          { country: "pk", value: 210797836 },  // pakistan
          { country: "br", value: 210301591 },  // brazil
          { country: "ng", value: 208679114 },  // nigeria
          { country: "bd", value: 161062905 },  // bangladesh
          { country: "ru", value: 141944641 },  // russia
          { country: "mx", value: 127318112 }   // mexico
        ]

        return(
            <div>
                <div className="worldMap">
                    <WorldMap color="green" title="Map" value-suffix="people" size="lg" data={data} />
                </div>
                <div className="redColumn">
                    {redVarieties.map(red => <Variety red={red} />)}
                </div>
                <div>
                    {whiteVarieties.map(white => <Variety white={white} />)}
                </div>
            </div>
        )
    }
}     

export default VarietyContainer