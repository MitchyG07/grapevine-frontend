import React, {Component} from 'react'
import Wine from '../components/Wine'

class WineContainer extends Component {
    render(){ 
        return(
            <div>
                {<Wine wine={this.props.wines} />}
            </div>
        )
    }
}

export default WineContainer