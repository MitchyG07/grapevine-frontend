import React, {Component} from 'react'

class UserContainer extends Component {

    state = {
        currentUser: this.props.user,
        bio: '',
        name: '',
        favorites: [],
        reviews: []
    }


componentDidMount(){
    this.getUser()
}



setUser = (user) => {
    user.wines.forEach( wines  => this.setState({
       name: user.username,
       bio: user.bio,
       favorites: [...this.state.favorites, wines.title]
    }))
    const token = localStorage.token;
    let  configW = {method: 'GET',  
    headers: {Authorization:  `Bearer ${token}`}} 
    user.reviews.forEach(  reviews => {
        fetch(`http://localhost:3000/wines/${reviews.wine_id}`, configW)
        .then(resp =>  resp.json())
        .then(wine =>  this.setState({
            reviews: [...this.state.reviews, {content: reviews.content, wine: wine.title}] })) })
    }

getUser =  () => {
    const token = localStorage.token;
    let  configObj = {method: 'GET',  
    headers: {Authorization:  `Bearer ${token}`}} 
fetch(`http://localhost:3000/users/${localStorage.id}`, configObj) 
    .then(resp  => resp.json())
    .then(user => this.setUser(user))  
    }

handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
        bio:  e.target.children[1].value 
    }) 
    this.editBio()
}

editBio = () => {
    const bio = {bio: this.state.bio}
    const token = localStorage.token;
    const user_id = localStorage.id
    fetch(`http://localhost:3000/users/${user_id}`,  {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
    }, body: 
       JSON.stringify(bio)
     }
    ) 
        .then(resp => resp.json())
        .then(user => this.setUser(user))
        }

        
        

render() {
    console.log(this.props.user)
   
    const {username,wines, reviews} = this.state.currentUser
    return(
      
        <div>
           <a>{this.state.name}</a>
           <a>{this.state.bio}</a>
           <form onSubmit={(e) => this.handleSubmit(e)}> 
              Bio: <br></br>
            <textarea></textarea>
            <input type='submit' value='Submit'></input>
           </form>
           <ol> 
               {this.state.favorites.map(faves => <li>{faves}</li>)} 
           </ol>
            <ul> 
                {this.state.reviews.map(review => <li>{review.content} -- {review.wine}</li>)} 
            </ul>
           
        </div>
    )

    }
}

export default UserContainer