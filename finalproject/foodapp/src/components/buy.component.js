import React,{Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Message from '../elements/Message';
import Error from '../elements/Error';
import Card from './card.component';
import Header from './header.component';
import Footer from './footer.component';



export default class Buy extends Component{

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
          sellers:[],
          clickedid: 0,
          addedId: [],
          cart: []
        };
    }

    componentDidMount(){
        if (JSON.parse(localStorage.getItem('cart'))!==null){
          if(this.state.cart.length !== JSON.parse(localStorage.getItem('cart')).length) {
            this.setState({
              cart: JSON.parse(localStorage.getItem('cart'))
            });
          }
        }
        axios.get('http://localhost:4000/buylist/list').then(res => {
            this.setState({sellers:res.data});
        }).catch(function(error){
            //console.log(error);
        })
    }




    handler(data) {
      var newStateArray = this.state.cart;
      newStateArray.push(data);
      this.setState({cart: newStateArray});
      localStorage.setItem('cart', JSON.stringify(newStateArray));
      var div = document.getElementById(data._id);
      div.childNodes[1].style.display="none";
      div.childNodes[0].innerHTML="Added to Cart";
      //console.log(data._id);
    }

    componentDidUpdate() {
      console.log(this.state.cart.length);
      for (var i=0; i<this.state.cart.length; i++){
        console.log(this.state.cart[i]._id);
        var div = document.getElementById(this.state.cart[i]._id);
        if (div == null) {
          break;
        }
        else {
          div.childNodes[1].style.display="none";
          div.childNodes[0].innerHTML="Added to Cart";
        }
      }
    }



    render(){
        return (
          <div>
            <Header/>
            <div className="appBody" style={{padding:'20px'}}>

            {
              this.state.sellers.map((dynamicData, i) => <Card action={this.handler} data={dynamicData} />)
            }
            </div>
            <Footer/>
          </div>
        )
    }
}
