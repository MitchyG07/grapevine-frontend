import React from 'react'
import Login from '../components/Login'
import {Route, withRouter} from 'react-router-dom'
import Wine from '../components/Wine'
import Home from '../components/Home'
import Nav from '../components/Nav'
import RegionalVarietyContainer from '../containers/RegionalVarietyContainer'
import Nav from '../components/Nav'
import VarietyContainer from '../containers/VarietyContainer'


const API = "http://localhost:3000";

class MainContainer extends React.Component {

    state = {
      selectedWine: '',
      user: {},
      error: false,
    };
  
    componentDidMount() {
      const token = localStorage.token;
      if (token) {
        this.persistUser(token);
      }
    }

   
  
    persistUser = (token) => {
      fetch(API + "/persist", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.username) {
            const { username, id } = data;
            this.setState({
              user: {
                username,
                id,
              },
            });
          }
        });
    };
  
    handleAuthResponse = (data) => {
      if (data.username) {
        const { username, id, token } = data;
  
        this.setState({
          user: {
            username,
            id,
          },
          error: null,
        });
  
        localStorage.setItem("token", token);
        this.props.history.push("/")
      } else if (data.error) {
        this.setState({
          error: data.error
        });
      }
    };
  
    handleLogin = (e, userInfo) => {
      e.preventDefault();
  
      fetch(API + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((resp) => resp.json())
        .then((data) => this.handleAuthResponse(data))
        .catch(console.log);
    };
  
    handleSignup = (e, userInfo) => {
      e.preventDefault();
  
      fetch(API + "/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userInfo }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.handleAuthResponse(data);
        })
        .catch(console.log);
    };
  
    handleLogout = () => {
      localStorage.clear();
      this.setState({ user: {} });
    };

    changeSelected = (wine) => {
        this.setState({
            selectedWine: wine
        })
    }
  
    renderLoginPage = () => <Login handleLoginOrSignup={this.handleLogin} />;
    renderSignUpPage = () => <Login handleLoginOrSignup={this.handleSignup} />;
        
  render() {
    const {user, error, wines} = this.state
   return (
    <div>
    <Nav user={user} handleLogout={this.handleLogout} />
    {!!error && <h1>{error}</h1>}

    <Route path="/login" component={this.renderLoginPage} />
    <Route path="/signup" render={this.renderSignUpPage} />

    <Route exact path="/" render={this.renderHomePage} />
    <Route exact path="/wine" render={() => { 
        return <Wine wine={this.state.selectedWine} /> }} /> 
    <Route exact path="/regionalvariety" render={() => { 
        return <RegionalVarietyContainer selectedWine={this.changeSelected} /> }} />  

    <Route exact path="/variety" component={VarietyContainer} />
    </div>
   )
  } 
}

export default withRouter(MainContainer)
