import React, {Component} from 'react'

class UserContainer extends Component {

    state = {
        currentUser: this.props.user,
        bio: '',
        name: ''
    }


componentDidMount(){
    this.getUser()
}

setUser = (user) => {
    this.setState({
       name: user.username,
       bio: user.bio
    })
}

getUser =  () => {
    const token = localStorage.token;
    let  configObj = {type: 'GET',  
    headers: {Authorization:  `Bearer ${token}`}} 
   
     fetch(`http://localhost:3000/users/${localStorage.id}`, configObj) 
    .then(resp  => resp.json())
    .then(user => this.setUser(user))  
}

editBio = (e) => {
    e.preventDefault()
    const token = localStorage.token;
    const user_id = localStorage.id
    fetch(`http://localhost:3000/users/${user_id}`,  {
    type: 'PATCH',
    headers: {
        Authorization: `Bearer ${token}`
    }, body: {
        bio: e.target.children[1].value
    } }
    ) 
        .then(resp => resp.json())
        .then(bio => console.log(bio))
    
        }
// }
        
        

render(){
    console.log(this.props.user)
   
    const {username,wines, reviews} = this.state.currentUser
    return(
      
        <div>
           <a>{this.state.name}</a>
           <a>{this.state.bio}</a>
           <form onSubmit={(e) => this.editBio(e)}> 
              Bio: <br></br>
            <textarea></textarea>
            <input type='submit' value='Submit'></input>
           </form>
           <a>{wines}</a>
           <a>{reviews}</a>
        </div>
    )

    }

   
}


export default UserContainer