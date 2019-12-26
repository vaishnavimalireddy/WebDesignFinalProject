import React,{Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import Error from '../elements/Error';

import SmallError from '../elements/SmallError';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Google from './google.component';
import Header from './header.component';
import Footer from './footer.component';
import {component} from 'react-redux';
import './login.css';

export default class Login extends Component{
        constructor(props)
        {
            super(props);

            this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

            this.state = {
                email:'',
                password:'',
                error: false,
                serror:false,
                isUserPresent:false,
                seller_email:'',
                succ:false
            }
        }

        onChangeEmail(e)
        {
             this.setState({
                email:e.target.value
             });
        }

        onChangePassword(e)
        {
             this.setState({
                password:e.target.value
             });
        }

        informParent = () => {
            return <Redirect to={{
                pathname: '/seller',
                state: { email: this.state.seller_email }
            }}/>
        };
        onSubmit= async e =>
        {
            e.preventDefault();
            this.setState({
               error:false,emailb:false,passb:false
             });
            if(this.state.email =='')
            {
                this.setState({
                    emailb:true
                })
            }

            if(this.state.password =='')
            {
                this.setState({
                    passb:true
                })
            }


            console.log(`Form submitted`);
            console.log(`email: ${this.state.email}`);
            if(this.state.password !=='' && this.state.email !=='')
            {
            const loginuser = {
                email : this.state.email,
                password:this.state.password,
            }

            const isUserPresent = await axios.post('http://localhost:4000/registration/login',loginuser).then(exist => exist.status)
            isUserPresent === 204 ? this.setState({error: true}) : this.setState({error: false});
                    console.log(isUserPresent);
                this.setState({
                    seller_email:this.state.email
                    })
                this.setState({
                    email:'',
                    password:''
                })

                if(isUserPresent === 200)
                {
                    console.log("pesent");
                    this.setState({
                       isUserPresent:true
                    })

                    window.sessionStorage.setItem("user",JSON.stringify(loginuser))
                }

            }

        }
        renderRedirect = () => {


            if (this.state.isUserPresent) {
              return <Redirect to={{
                pathname: '/home',
                state: { email: this.state.seller_email }
            }}/>
        }

          }




        render()
        {
            const {error,emailb,passb} = this.state;
            return (
              <div>
             <Header/>
             <div className="appBody">
             <br>
             </br>
                <div className="Login">

                <Google />

                <h1>Welcome <span className="h11"> onBoard!</span></h1>
                <h4>Login to start your journey with Carrier</h4>
				<form onSubmit={this.onSubmit}>

                        <div className="form-group">
                        <label className="tex">Email ID:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                            { emailb && <SmallError message={'Please mention email address'} /> }

                        </div>


                        <div className="form-group">
                        <label className="tex">Password:  </label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                            { passb && <SmallError message={'Please mention password'} /> }
                        </div>

                        <div className="form-group">

                        {this.renderRedirect()}
                        <button
                        type="submit"
                        className="btn"><span className="loginbtn">LOGIN </span></button>


                        </div>

                            &nbsp; &nbsp;
                      <Link to="/register"><span className="li">Not a User?</span></Link> &nbsp; &nbsp;
                        <Link to="/forgotpassword"><span className="li">Forgot Password?</span></Link> &nbsp; &nbsp;







                </form>
                { error && <Error message={'Wrong Credentials! Please give correct username or password'} /> }
                </div>
                <br>
                </br>
                <Footer/>
                </div>
                </div>
            );

        }


}
