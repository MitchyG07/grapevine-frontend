import React, {Component} from 'react'
import RegionalVariety from '../components/RegionalVariety.js'

class RegionalVarietyContainer extends Component {

    state = {
        wines: []
    }

    componentDidMount() {
        this.getWines()
    }

    getWines = (rv) =>  {
        const token = localStorage.token;
        fetch(`http://localhost:3000/wines`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => this.setState({
          wines: data.filter(wines =>  wines.country == "US"  && wines.variety == "Pinot Gris")
        }))
      }

      showTen = (c)  => {
        let a = 0
        let b = 10
        return this.state.wines.slice(a += c, b += c)
      }

    render(){ 
        return(
            <div>
                {this.showTen(0).map(rv  => <RegionalVariety wine={rv} ten={this.showTen} selectedWine={this.props.selectedWine} />) }
                <button onClick={() => this.showTen(10)}>Next Page</button>         
            </div>
        )
    }
}

export default RegionalVarietyContainer