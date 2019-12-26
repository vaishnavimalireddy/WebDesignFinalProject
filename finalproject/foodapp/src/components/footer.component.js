import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import './footer.css';
import insta from './images/insta.png';
import fb from './images/fb.png';
import wa from './images/wa.png';

class Footer extends Component {
  render(){
    return(
      <div id="footerContainer">
        <div className="footerHeader">
          <h3 className="secheading">Contact Us</h3>
        </div>
        <div className="footerBody">
          <div className="content">
            <div className="contentRight">
              <h5>Address</h5>
              <p>12, Peterborugh, Centrum Plaza,</p>
              <p>Boston, MA, 02215</p>
            </div>
            <div className="contentLeft">
              <h5>Phone Number</h5>
              <a href="tel:123-456-7890">+1 123-456-7890</a>
              <h5>Email Id</h5>
              <a href="mailto:carrier.io@gmail.com">carrier.io@gmail.com</a>
            </div>
            <div className="social">
              <a href="https://www.instagram.com/"><img src={insta} style={{ width: '50px', height: '50px', margin: '20px'  }} /></a>
              <a href="https://www.facebook.com/"><img src={fb} style={{ width: '50px', height: '50px', margin: '20px' }} /></a>
              <a href="https://web.whatsapp.com/"><img src={wa} style={{ width: '50px', height: '50px', margin: '20px'  }} /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
