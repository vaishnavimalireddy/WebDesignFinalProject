import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import Header from './header.component';
import Footer from './footer.component';
class Logout extends Component {
  render(){
    window.sessionStorage.removeItem("user");
    return(
        <div>
            <Header/>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
            <div style={{padding:'20px'}}>

                <div className="alert alert-success" role="alert">
                <span className="glyphicon glyphicon-thumbs-up"></span>
                <span className="message">You have successfully logged out</span>
                </div>

            </div>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>

            <Footer/>
        </div>
    );
  }
}

export default Logout;
