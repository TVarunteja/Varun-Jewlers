import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Header = () => {
  const [isMdDropdownVisible, setIsMdDropdownVisible] = useState(false);

  return (
    <header>
      
      <nav className="nav-container">
        <ul>
          <li>
            <div className="nav-link-container">
              <Link to='/add'>Add</Link>
            </div>
          </li>
          <li>
            <div className="nav-link-container">
              <Link to='/search'>Search</Link>
            </div>
          </li>
          <li
            className="nav-link-container"
            onMouseEnter={() => setIsMdDropdownVisible(true)}
            onMouseLeave={() => setIsMdDropdownVisible(false)}
          >
            <span>MD</span>
            {isMdDropdownVisible && (
              <ul className="dropdown">
                <li>
                  <Link to='/md1'>MD1</Link>
                </li>
                <li>
                  <Link to='/md2'>MD2</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="nav-link-container">
              <Link to='/md1customers'>MD1Customers</Link>
            </div>
          </li>
          <li>
            <div className="nav-link-container">
              <Link to='/md2customers'>MD2Customers</Link>
            </div>
          </li>
          <li>
            <div className="nav-link-container">
              <Link to='/takenaway'>TakenAway</Link>
            </div>
          </li>
        </ul>
        <span className="nav-underline"></span>
      </nav>
      
    </header>
  );
};

export default Header;
