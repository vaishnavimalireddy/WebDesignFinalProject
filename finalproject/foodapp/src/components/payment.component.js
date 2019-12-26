import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import Header from './header.component';

import Footer from './footer.component';
class PaymentSucess extends Component {
  render(){
    localStorage.removeItem('cart');
    return(
      <div>
        <Header/>
            <br>
            </br><br>
            </br>
            <br>
            </br>
            <br>
            </br><br>
            </br>
            <br>
            </br>
           <h1> Your payment is sucessfull! You can expect your food soon!</h1>
           <br>
           </br><br>
           </br>
           <br>
           </br>
           <br>
           </br><br>
           </br>
           <br>
           </br><br>
           </br>
           <br>
           </br>
           <br>
           </br>
           <br>
           </br><br>
           </br>
           <br>
           </br>
           <br>
           </br><br>
           </br>
           <br>
           </br>
           <br>
           </br><br>
           </br>
           <br>
           </br>
        <Footer/>
      </div>
    );
  }
}

export default PaymentSucess;
