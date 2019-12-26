import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './header.component';
import Footer from './footer.component';

const Activate = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true
    });
    //useeffe t will run wheever there is a change in state
    useEffect(() => {
        let token = match.params.token;
        sessionStorage.setItem('token',token);
        let { name } = jwt.decode(token);
        console.log(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, show } = values;

    const clickSubmit =  e => {
        e.preventDefault();

       
  
        axios({
            method: 'POST',
            url: `http://localhost:4000/registration/add`,
            data: { token }
        })
            .then(response => {
                console.log('ACCOUNT ACTIVATION', response);
                setValues({ ...values, show: false });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
                toast.error(error.response.data.error);
            });
        }
     
    

    const activationLink = () => (
        <div className="text-center">
            <h1>Hey <span class="h11">{name}</span>, ready to activate your account?</h1>
            <button className="btn" onClick={clickSubmit}>
                Activate Account
            </button>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
           
        </div>
    );

    return (
     <div>
    <Header/>
    <br>
    </br>
    <br>
    </br>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {activationLink()}
            </div>
            <Footer/>
            </div>
    );
};

export default Activate;