import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import './card.css';

class Card extends Component {
  constructor(props){
    super(props);
    this.state ={
      cart:[]
    }
  }

  componentDidUpdate() {
    //console.log(localStorage);
    var dish = this.props.data.dishname;
  }

  render(){
    return(

       <div className="box">
        <h5>Dish Name: {this.props.data.dishname}</h5>
        <p> <img src={this.props.data.photo} style={{ width: '250px', height: '200px' }} /></p>
        <h6>Price:</h6><span> ${this.props.data.price}</span><br></br>
        <h6>Weight:</h6><span> {this.props.data.quantity}lb</span><br></br>
        <h6>City:</h6><span> {this.props.data.address.city}</span><br></br>
        <div id = {this.props.data._id}>
        <div className="added"></div>
        <button className="button" onClick={() => {this.props.action(this.props.data)}} dell>ADD TO CART</button>
        </div>
      </div>







    );
  }
}

export default Card;
