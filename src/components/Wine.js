import React, {Component} from 'react'
import {Forms} from 'react-bootstrap'
import {BsStarFill, BsStar} from 'react-icons/bs'

class Wine extends React.Component {
    
   state = {
       reviews: [], 
       favorite: false,
       userWines: []
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
       userWines: user.wines
        })
        this.checkFavorite()
    }

    checkFavorite = () => {
      let  favorited = this.state.userWines.find(wine => wine.id === this.props.wine.id)
      console.log(this.state.userWines[0].id)
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
                user_id: this.props.user.id })    } 
            fetch('http://localhost:3000/reviews', config) 
               .then(resp => resp.json())
               .then(review  => {this.postReviewedWine(review) })
             }
    // then post to reviewed wine for joiner asdf
              
    postReviewedWine = (rw) => {
        this.setState(prevState => {
           return{ reviews: prevState.reviews.push(rw)  }
        })
        
        const token = localStorage.token
        const reviewWineBody = { method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
        },  body: JSON.stringify({
            wine_id: this.props.wine.id,
            review_id: rw.id }) }
        fetch('http://localhost:3000/reviewed_wines', reviewWineBody)
            .then(resp => resp.json())
            .then(rwd => console.log(rwd))            
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
        .then(data => console.log(data))
    }

    deleteFavorite = () => {
        fetch('http://localhost:3000/favorites', {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => console.log(data))
    }
    
    render() { 
        console.log(this.state)
    return(
        <div className='body'>
        <h1>Title: {this.props.wine.title}</h1>
        <h4>Description: {this.props.wine.description}</h4>
        <h4>Country: {this.props.wine.country}</h4>
        <h4>Rating: {this.props.wine.points} </h4>
        <p>Add to favorites: {this.state.favorite ? <BsStarFill onClick={this.handleClick}/> : <BsStar onClick={this.handleClick} />}</p> 
        <form exact='true' className='form-group' onSubmit={(e) => this.postReview(e)}>
            <textarea exact='true' className='form-control w-75' name='text' rows='3'></textarea>
            <input type='submit' value="Submit"></input>
        </form>
        <ul>{this.props.wine.reviews}</ul>
        </div>
    ) }
}

export default Wine 
