import React,{Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Message from '../elements/Message';
import Error from '../elements/Error';
import SmallError from '../elements/SmallError';
import { ToastContainer, toast } from 'react-toastify';
import Google from './google.component';
import Header from './header.component';
import Footer from './footer.component';
import './registration.css';
export default class Registration extends Component{

    constructor(props)
    {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            email:'', 
            password:'',
            register: false,
            error: false,
        
            
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
    onChangeName(e)
    {
         this.setState({
            name:e.target.value
         });
    }

    isEmailValid(){
        const emails = this.state.email;
       
        const validate = (emails) => {
            console.log(emails);
            const expression = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
            return expression.test(String(emails).toLowerCase())
        }
        if(validate(emails))
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    isPasswordValid(){
        const pass = this.state.password;
       
        const validate = (pass) => {
            console.log(pass);
            const expression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            return expression.test(String(pass).toLowerCase())
        }
        if(validate(pass))
        {  
            this.setState({
                pass_invalid:false
             });

            return true;
        }
        else 
        {
            this.setState({
                pass_invalid:true
             });
            return false;
        }
    }

    handleOnBlur = async e => {
		this.setState({
            email: e.target.value
        });
       
       
		const data = {
            email: this.state.email,
            password:this.state.password
		};
		const isUsernameTaken = await axios.post('http://localhost:4000/registration/validateEmail', data)
		.then(exist => exist.status)
        console.log(isUsernameTaken);
        isUsernameTaken === 204 ? this.setState({email_taken: true}) : this.setState({email_taken: false});
      

	}

    onSubmit(e)
    {

        e.preventDefault();
        this.setState({
            nameblanck: false,emailb: false,passb: false,pass_invalid:false
        });
       
        if(this.state.name ===''){
            this.setState({nameblanck: true}) 
        }
        if(this.state.email === '')
        {
            this.setState({emailb: true}) 
        }
        if(this.state.password === ''){
             this.setState({passb: true}) 
        }
        // if(this.state.password!==''){
        //     this.isPasswordValid();
        // }
     
      

      
        if(this.state.name!=='' && this.state.email!=='' && this.state.password!=='')
        {
                        const newuser = {
                            name:this.state.name,
                            email : this.state.email,
                            password:this.state.password,
                        
                        }
                        try {
                        
                        const a = axios.post('http://localhost:4000/registration/checkemail',newuser);

                        } catch (error) {
                            this.setState({ register: false,
                                error: true});
                        console.error(error);
                        }
                    
                        this.setState({
                                    email:'',
                                    password:'',
                                    name:'',
                                    register: true,
                                    error: false,
                                    nameblanck: false,emailb: false,passb: false

                                    });
        }
       
    
    }

    render(){
        const { register, error, email_taken ,nameblanck,emailb,passb,pass_invalid} = this.state;
        return (
            <div>
           <Header/>
           <br>
           </br>
           <br>
           </br>
           <br>
           </br>
            <div className="Registration">
            <h1>Join Us!</h1>
          
            <form onSubmit={this.onSubmit}>
                <div>
                    <div className="form-group">
                    <label className="tex">Name: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                        { nameblanck && <SmallError message={'Please enter name'} /> }
                    </div>

                    <div className="form-group">
                    <label className="tex">Email ID:  </label>
                    <input type="text" 
                       className= "form-control"
                       value={this.state.email} 
                       onBlur={this.handleOnBlur} 
                       onChange={this.onChangeEmail} 
                       name="email"
                       autoComplete="Email" />
                       { email_taken && <SmallError message={'Email already exits'} /> }
                       { emailb && <SmallError message={'Please enter email'} /> }
                      
                    </div>
                     
                    <div className="form-group">
                    <label className="tex">Password:  </label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                        { passb && <SmallError message={'Please enter pass' }/> } 
                        { pass_invalid && <SmallError message={'Please enter valid password'}/> }
                    </div>

                    <div className="form-group">
                    
                    <input 
                        type="submit" value ="Sign Up"
                        className="btn" disabled={email_taken}
                        />
                        &nbsp; &nbsp; 
                        <Link to="/login"><span className="li">Cancel</span></Link>
                    </div>

                </div>


            
            </form>
            { error && <Error message={'Error in Registration'} /> }
		    { register && <Message message={'Registered Successfully,Please check your email to activate your account'} /> }
            </div>
            <Footer/>
            </div>
        );

    }


}