import React from 'react'
import Login from '../components/Login'
import {Route, withRouter} from 'react-router-dom'
import Wine from '../components/Wine'
import Home from '../components/Home'
import Navi from '../components/Navi'
import RegionalVarietyContainer from '../containers/RegionalVarietyContainer'
import VarietyContainer from './VarietyContainer'
import UserContainer from './UserContainer'


const API = "http://localhost:3000";

class MainContainer extends React.Component {

    state = {
      selectedWine: {},
      user: {},
      variety: '',
      country: '',
      error: false
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
            const { username, id, bio, wines } = data;
            this.setState({
              user: {
                username,
                id,
                bio: ''
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
        localStorage.setItem("id", this.state.user.id)
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

    country = (country) => {
      this.setState({
        country: country
      })
    }

    variety = (variety) => {
      this.setState({
        variety: variety
      })
    }

    renderLoginPage = () => <Login handleLoginOrSignup={this.handleLogin} />;
    renderSignUpPage = () => <Login handleLoginOrSignup={this.handleSignup} />;
        
  render() {
    console.log(this.state)
    const {user, error, wines, variety} = this.state
   return (
    <div>
    <Navi user={user} handleLogout={this.handleLogout} />
    {!!error && <h1>{error}</h1>}

    <Route path="/login" component={this.renderLoginPage} />
    <Route path="/signup" render={this.renderSignUpPage} />

    <Route exact path="/" render={this.renderHomePage} />
    <Route exact path="/wine" render={() => { 
        return <Wine wine={this.state.selectedWine} user={this.state.user} /> }} /> 
    <Route exact path="/regionalvariety" render={() => { 
        return <RegionalVarietyContainer user={this.state.user} selectedWine={this.changeSelected} variety={this.state.variety} country={this.state.country} /> }} />  

    <Route exact path="/variety" render={() => { 
      return <VarietyContainer getCountry={this.country} getVariety={this.variety}/> }} />
      {/* getVariety={this.variety} */}
      <Route exact path="/user" render={() => { 
        return <UserContainer   selectedWine={this.changeSelected} user={this.state.user} /> }} />
    </div>
   )
  } 
}

export default withRouter(MainContainer)
