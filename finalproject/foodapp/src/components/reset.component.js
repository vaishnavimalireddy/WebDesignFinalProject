import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Message from '../elements/Message';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from 'react-router-dom';
import Header from './header.component';
import Footer from './footer.component';
const Reset = ({ match }) => {
    // props.match from react router dom
    const [values, setValues] = useState({
        name: '',
        token: '',
        _id:'',
        newPassword: '',
        resets:false
    });

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);
        let {_id} = jwt.decode(token);
        console.log(name);
        if (token) {
            setValues({ ...values, name, token ,_id});
        }
    }, []);

    const { name, token, newPassword, resets,_id } = values;

    const handleChange = event => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `http://localhost:4000/registration/resetpassword`,
            data: { newPassword, id: _id }
        })
            .then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values,resets: true});
            })
            .catch(error => {
                console.log('RESET PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, resets: false  });
            });
    };
  
    const passwordResetForm = () => (
        <form>
            <div className="form-group">
                
                <input
                    onChange={handleChange}
                    value={newPassword}
                    type="password"
                    className="form-control"
                    placeholder="Type new password"
                    required
                />
            </div>

            <div>
                <button className="btn" onClick={clickSubmit}>
                    Reset
                </button>
               

            </div>
        </form>
    );

    return (
       <div>
        <Header/>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hey <span class="h11">{name}</span>, type your new password</h1>
                {passwordResetForm()}
                { resets && <Message message={'Success!! Your password has been reset'} /> }
            </div>
            <div>
       
            </div>
        <Footer/>
        </div>

    );
};

export default Reset;