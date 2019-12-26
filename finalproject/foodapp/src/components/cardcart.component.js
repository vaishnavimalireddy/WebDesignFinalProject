import React,{Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Message from '../elements/Message';
import Error from '../elements/Error';
import Card from './card.component';
import Header from './header.component';
import Footer from './footer.component';
import './card.css';
 class Cardcart extends Component{
    constructor(props){
      super(props);
      this.state = {
        token: window.sessionStorage.getItem("user")

      }

    }

    render(){
        return(
           <div>
           <div className="box" style={{height: '380px'}}>
            <h5>Dish Name: {this.props.data.dishname}</h5>
            <p> <img src={this.props.data.photo} style={{ width: '250px', height: '200px' }} /></p>
        <h6>Price:</h6> <span>${this.props.data.price}</span><br></br>
        <h6>Weight:</h6> <span>{this.props.data.quantity}lb</span><br></br>
        <h6>City:</h6> <span>{this.props.data.address.city}</span><br></br>
           </div>

          </div>

        );
      }

    }

    export default Cardcart;
