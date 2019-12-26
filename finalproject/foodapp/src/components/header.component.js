import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import './header.css';
import logo from './images/logo.png';
import cart from './images/cart.png';
import menu from './images/menu.png';

class Header extends Component {




  render(){
    function toggleDropdown(e) {
      e.preventDefault();
      var dropdown = document.querySelector(".smNavOptions");
      if (dropdown.style.display ==="none"){
        dropdown.style.display = "block";
      }
      else {
        dropdown.style.display = "none";
      }

    }
    const user =  window.sessionStorage.getItem("user")
    if(user){
      return(
      <div className="headerContainer">
      <div className="divLeft">
        <img src={logo} alt="Logo" className ="logo" />
      </div>
      <div className="divRight">
        <div className="navOptions">
          <Link to="/home">Home</Link>
          <Link to="/buy">Buy Food</Link>
          <Link to="/seller">Sell Food</Link>
          <Link to="/logout">Log Out</Link>

          <a href="#footerContainer"> Contact us</a>
        </div>
        <a href="#" className ="menuIcon" onClick={toggleDropdown}><img src={menu} alt="Menu" className ="icon" /></a>
        <div className="smNavOptions">
          <Link to="/home">Home</Link>
          <Link to="/buy">Buy Food</Link>
          <Link to="/seller">Sell Food</Link>
          <Link to="/logout">Log Out</Link>
          <a href="#footerContainer"> Contact us</a>
        </div>
        <Link to="/cart"><img src={cart} alt="Cart" className ="cart" /></Link>
      </div>
    </div>
      );
    }
    else{

    return(
      <div className="headerContainer">
        <div className="divLeft">
          <img src={logo} alt="Logo" className ="logo" />
        </div>
        <div className="divRight">
          <div className="navOptions">
            <Link to="/home">Home</Link>
            <Link to="/buy">Buy Food</Link>
            <Link to="/seller">Sell Food</Link>
            <Link to="/login">Log In</Link>

            <a href="#footerContainer"> Contact us</a>
          </div>
          <a href="#" className ="menuIcon" onClick={toggleDropdown}><img src={menu} alt="Menu" className ="icon" /></a>
          <div className="smNavOptions">
            <Link to="/home">Home</Link>
            <Link to="/buy">Buy Food</Link>
            <Link to="/seller">Sell Food</Link>
            <Link to="/login">Log In</Link>
            <a href="#footer"> Contact us</a>
          </div>
          <Link to="/cart"><img src={cart} alt="Cart" className ="cart" /></Link>
        </div>
      </div>
    );
  }
}
}

export default Header;
