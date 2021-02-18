import React, {Component} from 'react'
import {Table, ListGroup, Container, Row, Col, Button, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import grape from '../images/grape.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

// var grapeVar = {
//     backgroundImage: `url(${grape})`

// }


class UserContainer extends Component {

    state = {
        bio: '',
        name: '',
        favorites: [],
        reviews: [],
        visible: true
    }


componentDidMount(){
    this.getUser()
}



setUser = (user) => {
    user.wines.forEach( wines  => this.setState({
       name: user.username,
       bio: user.bio,
       favorites: [...this.state.favorites,  [wines.title, wines.id]]
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
        bio:  e.target.children[0].value,
        visible: !this.state.visible
    }) 
    this.editBio(e.target.children[0].value)
    e.target.children[0].value = ''
}

editBio = (content) => {
    const bio = {bio: content}
    const token = localStorage.token;
    const user_id = localStorage.id
    fetch(`http://localhost:3000/users/${user_id}`,  {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
    }, body: 
       JSON.stringify(bio)
     } )}

toggleBio =  () =>  {
    this.setState(prevState => {
        return {visible: !prevState.visible }
    })
}

sendWine = (id) => {
    const token = localStorage.token;
    let  configW = {method: 'GET',  
    headers: {Authorization:  `Bearer ${token}`}}
        fetch(`http://localhost:3000/wines/${id}`, configW)
        .then(resp =>  resp.json())
        .then(wine => {
            console.log(wine)
            this.props.selectedWine(wine)
        })
}

render() {
   
    return(
       <Container className='body'>
       <Row >
           <h1 className='padding-md'>{this.state.name}</h1>
       </Row> 
       <Row className='border border-dark rounded'>
           {this.state.visible ? 
           <h3 className='p-3'>About:  {this.state.bio}</h3> :
           <form  className='form-group p-2' onSubmit={(e) => this.handleSubmit(e)}> 
    
             <textarea className='form-control'></textarea><br></br>
             <input type='submit' value='Submit'></input>
         </form>
         }           
       </Row>
       <Row className='pb-2 pt-2'>
            <Button variant='outline-dark' onClick={() => this.toggleBio()}>{this.state.visible ? 'Edit Bio' : 'Cancel'}</Button>
            <FontAwesomeIcon  className='edit-icon' icon={faUserEdit} size='lg' />
       </Row>
               
             <Row> 
                 <Col> 
                    <Table striped bordered hover variant="dark" className='w-auto favorites'>
                        <thead >
                          <th >#</th>
                          <th>Wine Title</th>
                        </thead>
                        <tbody > 
                            {this.state.favorites.map((faves, i) => <tr> <td>{i + 1})</td> 
                            <td onClick={() => this.sendWine(faves[1])}>  <Link to='/wine' className='white'>{faves[0]}</Link></td></tr> )} <br></br>
                        </tbody>
                    </Table>
                </Col>
             <Col>
                <h4> Reviews </h4>
                <ul className='user-review'> 
                 {this.state.reviews.map(review => <li >{review.content} -- {review.wine}</li>)} 
                </ul>
                {/* <Image src={grape} alt='grape' /> */}
             </Col>
            </Row>
            <Row> 
           
           </Row>
          </Container>
         
    )

    }
}

export default UserContainer