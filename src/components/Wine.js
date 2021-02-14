import React, {Component} from 'react'
import {Forms} from 'react-bootstrap'

class Wine extends React.Component {
    
   state = {
       reviews: []
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
    // then post to reviewed wine for joiner 
              
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
    
  

    render() { 
    return(
        <div className='body'>
        <h1>Title: {this.props.wine.title}</h1>
        <h4>Descritption: {this.props.wine.description}</h4>
        <h4>Country: {this.props.wine.country}</h4>
        <h4>Rating: {this.props.wine.points} </h4>
        <form exact='true' className='form-group' onSubmit={(e) => this.postReview(e)}>
            <textarea exact='true' className='form-control w-75' name='text' rows='3'></textarea>
            <input type='submit' value="Submit"></input>
        </form>
        <ul>{this.props.wine.reviews}</ul>
        </div>
    ) }
}

export default Wine 
