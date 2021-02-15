import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class Login extends Component{

  state= {
    username: "",
    password: "",
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

    
  render() {
    return(
        
      <div className="Login body left" >
        <form onSubmit={(e) => this.props.handleLoginOrSignup(e, this.state)}>
          <label>Username</label> <br></br>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <label>Password</label><br></br>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br /><br></br>
          <input class='btn btn-outline-dark btn-lg' variant='outline-dark' type="submit" value="Submit" ></input>
        </form>
      </div>

    )
  }
}

export default Login 