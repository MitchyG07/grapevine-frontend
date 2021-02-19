import React, {Component} from 'react'
import {Forms} from 'react-bootstrap'
import {BsStarFill, BsStar} from 'react-icons/bs'
import Review from './Review'

class Wine extends React.Component {
    
   state = {
       reviews: [], 
       favorite: false,
       userWines: [],
       userFavorites: [],
       id: 0,
       blank: ''
   }

   componentDidMount(){
    this.getUser()
    }   

    getUser =  () => {
        const token = localStorage.token;
        let  configObj = {method: 'GET',  
        headers: {Authorization:  `Bearer ${token}`}} 
    fetch(`http://localhost:3000/users/${this.props.user.id}`, configObj) 
        .then(resp  => resp.json())
        .then(user => this.setUser(user))  
    }

   setUser = (user) => {
    this.setState({
       userWines: user.wines,
       userFavorites: user.favorites,
       reviews: this.props.wine.reviews ? this.props.wine.reviews : []
        })
        this.checkFavorite()
    }

    checkFavorite = () => {
      let favorited = this.state.userWines.find(wine => wine.id === this.props.wine.id)
      favorited ? this.setState({
          favorite: true
      })
      : this.setState({
          favorite: false 
      })
    }
   
    
    postReview = (e) => {
            e.preventDefault()
            const token = localStorage.token;
            let config = { method: 'POST',
            headers: {'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                content: e.target.children[0].value,
                user_id: this.props.user.id, 
                wine_id: this.props.wine.id })} 
            fetch('http://localhost:3000/reviews', config) 
               .then(resp => resp.json())
               .then(review  =>  this.setState({
                   reviews: [...this.state.reviews, review]
               }))
               e.target.children[0].value = ''
    }


    handleClick = () => {
        this.setState({
            favorite: !this.state.favorite    
        })
        !this.state.favorite
        ? this.postFavorite() 
        : this.deleteFavorite()
    }

    postFavorite = () => {
        const token = localStorage.token
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
            user_id: this.props.user.id,
            wine_id: this.props.wine.id }) 
        }
        fetch('http://localhost:3000/favorites', configObj)
        .then(resp => resp.json())
        .then(data => this.setState({
            userFavorites: [...this.state.userFavorites, data]
        }))
    }

    deleteFavorite = () => {
        const token = localStorage.token
        let getFavorite = this.state.userFavorites.find(f => this.props.wine.id === f.wine_id)
        let id = getFavorite.id
        fetch(`http://localhost:3000/favorites/${id}`,{method: 'DELETE', headers:{Authorization: `Bearer ${token}`}})
            .then(resp => resp.json())
            .then(console.log) 
    }
    
    render() { 
        console.log(this.state)
    return(
        <div className='body'>
        <h1>Title: {this.props.wine.title}</h1>
        <h4>Country: {this.props.wine.country}</h4>
        <h4>Rating: {this.props.wine.points} </h4>
        <h5>Description: {this.props.wine.description}</h5>
        <h5>Add to your favorites: {this.state.favorite ? <BsStarFill onClick={this.handleClick}/> : <BsStar onClick={this.handleClick} />}</h5> 
        <p>Submit your Review:</p>
        <form exact='true' className='form-group' onSubmit={(e) => this.postReview(e)}>
            <textarea exact='true' className='form-control w-75' name='text' rows='3'></textarea>
            <input type='submit' value="Submit"></input>
        </form>
        <ul>
            {
                this.state.reviews[0]
                ? <h4>Critics Say:</h4>
                : <div></div> 
            }
            {
                this.state.reviews[0]
                ? this.state.reviews.map(review => <Review review={review} />)
                : <div></div> 
            }
        </ul>
        </div>
    ) }
}

export default Wine 
