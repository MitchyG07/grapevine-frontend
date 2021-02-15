import React from "react";
import { NavLink } from "react-router-dom";
import {Navbar, Nav, Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWineBottle } from '@fortawesome/free-solid-svg-icons'


const Navi = ({ user, handleLogout }) => {

  return (
    <Navbar className='color-nav rounded-bottom' >
      <FontAwesomeIcon icon={faWineBottle} size='lg' />
      <Navbar.Brand >Grapevine</Navbar.Brand>
        {!user.id ? (
            <Nav className='mr-auto' >
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </Nav>
        ) : (
             <Nav className='mr-auto' > 
              <Nav.Link href="/home" exact>Home</Nav.Link>
              <Nav.Link href="/variety"> All Varieties</Nav.Link>
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </Nav> 
        )}
          
          </Navbar>   
  );
};

export default Navi;
