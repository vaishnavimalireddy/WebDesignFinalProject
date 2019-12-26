import React,{Component} from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

//import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
const google_client_id = "547672589766-9rdugn3hc0fjqtbhfsor6daijf1sjrp3.apps.googleusercontent.com"

export default class Google extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            seller_email:'',
            succ:false
        }


    }

    responseGoogle = response => {
        console.log(response.tokenId);
        axios({
            method: 'POST',
            url: `http://localhost:4000/registration/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                console.log('GOOGLE SIGNIN SUCCESS', response.data.user.email);
                this.setState({
                    seller_email:response.data.user.email,
                    succ:true
                 });
                
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error);
                //toast.error(error.response.data.error);
            });
    }
    render(){
    return (
        <div className="pb-3">
       
            <GoogleLogin
                clientId={`${google_client_id}`}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                // render={renderProps => (
                //     <button
                //         onClick={this.renderRedirect}
                //         disabled={renderProps.disabled}
                //         className="btn btn-primary btn-lg btn-block"
                //     >
                //         <i className="fab fa-google pr-2"></i> Login with Google
                //     </button>
                // )}
                cookiePolicy={'single_host_origin'}
              
            />
        </div>
    );
                }
}