import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ user, handleLogout }) => {

  return (
    <header>
      <h3>Grapevine</h3>
      <ul>
        {!user.id ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/home" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/variety">All Varieties</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Nav;
