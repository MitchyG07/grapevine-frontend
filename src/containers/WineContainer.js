import React, {Component} from 'react'
import Wine from '../components/Wine'

class WineContainer extends Component {

    state = {
        wines: [],
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
        return(
            <div>
                {<Wine wine={this.state.wines} />}
            </div>
        )
    }
}

export default WineContainer