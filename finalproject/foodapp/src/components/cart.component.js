import React,{Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from './header.component';
import Footer from './footer.component';
import Cardcart from './cardcart.component';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './cart.css';
export default class Cart extends Component{


    constructor(props)
    {

        super(props);

        this.state = {
            total: 0,
            succes:false,
            link:'',
            cart: JSON.parse(localStorage.getItem('cart')),
            token:window.sessionStorage.getItem("user"),
            total:10
        }


    }


    onSubmit= e =>{

       e.preventDefault();

        axios({
            method: 'POST',
            url: `http://localhost:4000/buylist/paypal`,
            data:{total:this.state.total}
        })
            .then(response => {
            //return <Redirect to= 'https://www.sandbox.paypal.com/us/home' />

                console.log('PAYPAL RESPONSE', response.data.link);
                this.setState({
                    success:true,
                    link:response.data.link
                  });


            })
            .catch(error => {
                console.log('Cart error');

            });



     }
     renderRedirect = () => {


        if (this.state.success) {
          return <Redirect to= {this.state.link}/>
        }

      }


    // state = {
    //     redirect: false
    //   }
    //   setRedirect = () => {
    //     this.setState({
    //       redirect: true
    //     })
    //   }
    //   renderRedirect = () => {
    //     if (this.state.redirect) {
    //       return <Redirect to='response.data.link' />
    //     }
    //   }
    //   render () {
    //     return (
    //        <div>
    //         {this.renderRedirect()}
    //         <button onClick={this.setRedirect}>Redirect</button>
    //        </div>
    //     )
    //   }
    //  total = { this.state.cart.forEach(c =>
    //     c.reduce((total, c)=>  total + c.price
    //     , 0)
    //   )}


    handleClick = () => {
        this.setState({
            cart: [],

        });
        localStorage.setItem('cart', JSON.stringify(this.state.cart));

    }
    render(){
        console.log(this.state.cart);
       
       
        

                // this.setState({
                //         total:total
                // })
             const {token} = this.state;
                if(token === null)
                {
                  console.log(token)
                  return (

                      <div>


                            <Redirect to={{
                                pathname: '/login',

                            }}/>
                        </div>
                  );

                }
                else if(this.state.cart){
                    const carts = [...this.state.cart];
                    const total =
                            carts.reduce((total, cart)=>  total + cart.price, 0)

        return(

           <div>
                        <Header/>

                                <div className="appBody" style={{padding:'20px'}}>
                                        <h1 className="">Order <span className="h11"> Summary</span></h1>
                                        <h3>Total Amount: ${total}</h3>
                                        {
                                        this.state.cart.map((id, i) => <Cardcart  data={id} />)
                                        }


                                <form onSubmit={this.onSubmit}>

                                        <div className="form-group">

                                        <input
                                        style={{fontWeight:'bold'}}
                                        type="submit" value ="CONFIRM ORDER"
                                        className="btn"/><br></br>
                                        <a href={this.state.link} >Click here to pay</a>
                                        </div>
                                </form>
                                </div>



                        <Footer/>

            </div>

        );
                                    }
        else{
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
                                   <div>
                                        <h1> YOUR CART IS EMPTY</h1>
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
                                   <br>
                                   </br>
                                   <br>
                                   </br>
                                   <br>
                                   </br>
                                   <br>
                                   </br>     <br>
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
                                   <br>
                                   </br>
                                   <br>
                                   </br>
                                
                            
                             <Footer/>
     
                 </div>
     
             );
        
        }
    }
}
