import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Homepage from './components/homepage.component';
import Login from './components/login.component';
import Logout from './components/logout.component';
import Cart from  './components/cart.component';
import Registration from './components/registration.component';
import Buy from './components/buy.component';
import Seller from './components/seller.component';
import ForgotPassword from './components/forgotpassword.component';
import Activate from './components/activate.component';
import Reset from './components/reset.component';
import Google from './components/google.component';
import PaymentSucess from './components/payment.component';

import './App.css';

function App() {
  return (
      <div>
        <Router>
          <div className="App">
            <Switch>
                  <Route  path="/cart" exact component={Cart} />
                  <Route  path="/register" exact component={Registration} />
                  <Route  path="/home" exact component={Homepage} />
                  <Route  path="/buy" exact component={Buy} />
                  <Route  path="/login" exact component={Login} />
                  <Route  path="/logout" exact component={Logout} />
                  <Route  path="/seller" exact component={Seller} />
                  <Route  path="/activate/:token" exact component={Activate} />
                  <Route  path="/forgotpassword" exact component={ForgotPassword} />
                  <Route  path="/reset/:token" exact component={Reset} />
                  <Route  path="/google" exact component={Google} />
                  <Route  path="/paymentsucess" exact component={PaymentSucess} />
                  
                  

                  <Redirect from="/" to="home" />

            </Switch>
          </div>
      </Router>
      </div>
  );
}

export default App;
