
import React,{Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Message from '../elements/Message';
import Error from '../elements/Error';
import SmallError from '../elements/SmallError';
import { ToastContainer, toast } from 'react-toastify';
import Header from './header.component';
import Footer from './footer.component';


export default class ForgotPassword extends Component{

    constructor(props)
    {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
      
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email:'',
            email_sent:false,
            emailb:false,

         
        }
    }

    onChangeEmail(e)
    {
         this.setState({
            email:e.target.value
         });
    }

    onSubmit= async e =>
    {
       e.preventDefault();
       console.log(this.state.email)
       const email =this.state.email;
       if(this.state.email!==''){
       axios({
        method: 'PUT',
        url: `http://localhost:4000/registration/forgotpassword`,
        data: {email}
    })
        .then(response => {
            console.log('FORGOT PASSWORD SUCCESS', response);
            toast.success(response.data.message);
            this.setState({email_sent:true });
        })
        .catch(error => {
            console.log('FORGOT PASSWORD ERROR', error.response.data);
            toast.error(error.response.data.error);
            this.setState({email_sent:false ,buttonText: 'Request password reset link' });
        });
    }
    else{
        this.setState({emailb:true});
    }

    }

 
    render(){
        const {email_sent,emailb,passb} = this.state;
        return (
            <div>
           <Header/>
           <br></br>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Trouble Logging In?</h1>
                <h4>Enter your  email and we'll send you a link to get back into your account.</h4>
                <form> 
                <div className="form-group">
                   
                    <input onChange={this.onChangeEmail}  value={this.state.email} type="email" className="form-control" />
                    { emailb && <SmallError message={'Please mention your email'} /> }
                </div>
    
                <div>
                    <button className="btn" onClick={this.onSubmit}>
                        Send Link
                    </button>
                </div>
            </form>
            <br>
            </br>
            <br>
            </br>
            <Link to="/login"><span className="li">Back to Login</span></Link>

            { email_sent && <Message message={'Email has been sent.Please check your email to reset your password'} /> }
            </div>
          

            <Footer/>

            </div>
        );

    }






}