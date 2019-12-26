import React,{Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Message from '../elements/Message';
import Error from '../elements/Error';
import SmallError from '../elements/SmallError';
import Login from './login.component';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//import { addImage } from "../actions/imageActions";
import Header from './header.component';
import Footer from './footer.component';


export default class Seller extends Component{

    constructor(props)
    {
        super(props);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeDishName = this.onChangeDishName.bind(this);
        this.onChangeCuisine = this.onChangeCuisine.bind(this);
        this.onChangeLbs = this.onChangeLbs.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onChangeAddressStreet1 = this.onChangeAddressStreet1.bind(this);
        this.onChangeAddressStreet2 = this.onChangeAddressStreet2.bind(this);
        this.onChangeAddressCity = this.onChangeAddressCity.bind(this);
        this.onChangeAddressState = this.onChangeAddressState.bind(this);
        this.onChangeAddressZipCode = this.onChangeAddressZipCode.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            phonenumber:'',
            dishname:'',
            cuisine:'',
            lbs:'',
            quantity: '',
            price: '',
            photo:'',
            address  :{
                street1 : '',
                street2: '',
                city:'',
                state:'',
                zipcode:''

           },
            posted: false,
            error: false,
            email:"sdsd",
            token : window.sessionStorage.getItem("user")
          // email: this.props.location.state.email
        }





    }

    onChangePhoneNumber(e)
    {
         this.setState({
            phonenumber:e.target.value
         });
    }

    onChangeDishName(e)
    {
         this.setState({
            dishname:e.target.value
         });
    }

    onChangeCuisine(e)
    {
         this.setState({
            cuisine:e.target.value
         });
    }

    onChangeLbs(e)
    {
         this.setState({
            lbs:e.target.value
         });
    }

    onChangeQuantity(e)
    {
         this.setState({
            quantity:e.target.value
         });
    }

    onChangePrice(e)
    {
         this.setState({
            price:e.target.value
         });
    }
    onChangePhoto(e)
    {
        this.setState({
            photo:e.target.files[0]
         });
    }

    onChangeAddress(e){

        this.setState({
            address:e.target.value
         });

    }

    onChangeAddressStreet1(e){

        var newSelected =this.state.address;
        newSelected.street1 = e.target.value;
        this.setState({ address: newSelected });

    }

    onChangeAddressStreet2(e){

        var newSelected =this.state.address;
        newSelected.street2 = e.target.value;
        this.setState({ address: newSelected });

    }

    onChangeAddressCity(e){

        var newSelected =this.state.address;
        newSelected.city = e.target.value;
        this.setState({ address: newSelected });

    }

    onChangeAddressState(e){

        var newSelected =this.state.address;
        newSelected.state = e.target.value;
        this.setState({ address: newSelected });
    }

    onChangeAddressZipCode(e){

        var newSelected =this.state.address;
        newSelected.zipcode = e.target.value;
        this.setState({ address: newSelected });
    }



    isPhoneValid(){
        const phone = this.state.phonenumber;

        const validate = (phone) => {
            console.log(phone);
            const expression = /^\d{10}$/
            return expression.test(Number(phone))
        }
        if(validate(phone))
        {

            return true;
        }
        else
        {

            return false;
        }
    }

    onSubmit(e)
    {
        e.preventDefault();
        if(this.isPhoneValid())
        {
            console.log("sdfdf");
            this.setState({
                phone_invalid: false
            });
        }
        else{
            this.setState({
                phone_invalid: true
            });
        }

        //console.log(email)
        this.setState({
           phoneb:false, dishb: false,cusinieb: false,lbsb: false,quantityb:false,priceb:false,street1b:false,street2b:false,cityb:false,zipcodeb:false,posted:false
        });

        if(this.state.phonenumber =='')
        {
            this.setState({
                phoneb:true
            })
        }
        if(this.state.dishname =='')
        {
            this.setState({
                dishb:true
            })
        }
        if(this.state.cuisine =='')
        {
            this.setState({
                cusinieb:true
            })
        }

        if(this.state.lbs =='')
        {
            this.setState({
                lbsb:true
            })
        }

        if(this.state.quantity =='')
        {
            this.setState({
                quantityb:true
            })
        }

        if(this.state.price =='')
        {
            this.setState({
                priceb:true
            })
        }

        if(this.state.address.street1 =='')
        {
            this.setState({
                street1b:true
            })
        }

        if(this.state.address.street2 =='')
        {
            this.setState({
                street2b:true
            })
        }

        if(this.state.address.city =='')
        {
            this.setState({
                cityb:true
            })
        }

        if(this.state.address.zipcode =='')
        {
            this.setState({
                zipcodeb:true
            })
        }

        if(this.isPhoneValid())
        {
            if(this.state.phonenumber!=='' && this.state.dishname!=='' && this.state.cuisine!=='' && this.state.lbs!=='' && this.state.quantity!==''&& this.state.price!==''&& this.state.address.city!==''&& this.state.address.street1!=='' && this.state.address.street2!==''&& this.state.address.zipcode!=='')
                {
                    console.log("inside")
                    console.log(this.state.photo)
                    console.log(this.state.isuserloggedin)
                    const formData = new FormData();
                    formData.append('file',this.state.photo);
                    console.log(formData)
                    //this.props.addImage(formData);
                    const newsell = {
                        seller_email:this.state.email,
                        phonenumber:this.state.phonenumber,
                        dishname : this.state.dishname,
                        cuisine:this.state.cuisine,
                        lbs:this.state.lbs,
                        quantity : this.state.quantity,
                        price:this.state.price,
                        photo:this.state.photo,
                        address:{
                            city:this.state.address.city,
                            state:this.state.address.state,
                            zipcode:this.state.address.zipcode,
                            street1:this.state.address.street1,
                            street2:this.state.address.street2,

                        }

                    }

                    try {

                        const a = axios.post('http://localhost:4000/addsellpost/addsell',newsell);

                        } catch (error) {
                            this.setState({ posted: false,
                                error: true});
                        console.error(error);
                        }


                        this.setState({
                            phonenumber:'',
                            dishname:'',
                            cuisine:'',
                            lbs:'',
                            quantity: '',
                            price: '',
                            photo:'',
                            address  :{
                                street1 : '',
                                street2: '',
                                city:'',
                                state:'',
                                zipcode:''

                           },
                            posted: true,
                            error: false,
                        })






                }
        }



    }

    uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'rhnyewale')
        this.setState({

            loading:true
        })
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/rhncloud/image/upload',
        {
            method: 'POST',
            body: data
        }
        )
        const file = await res.json()
        this.setState({
            photo:file.secure_url,
            loading:false
        })

    }



    render(){
        const { phone_invalid,phoneb,dishb, cusinieb, lbsb ,quantityb,priceb,street1b,street2b,zipcodeb,cityb,error,posted,token} = this.state;
        console.log(token)
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
        else{


        return (
            <div>
           <Header/>
           <br>
           </br>
            <div className="Seller" style={{padding: '20px'}}>
            <br>
            </br>
            <h1 className="">Start <span className="h11"> Selling!</span></h1>
            <h4>Start your journey of selling by filling out the details.</h4>
            <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                    <label className="tex" >Enter Phone number to contact: </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: 1234567890"
                        value={this.state.phonenumber}
                        onChange={this.onChangePhoneNumber}
                        />
                        { phoneb && <SmallError message={'Please enter phone number'} /> }
                        { phone_invalid && <SmallError message={'Please enter valid phone number'} /> }
                    </div>
                    <div className="form-group">
                    <label className="tex">Dish Name:  </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.dishname}
                        onChange={this.onChangeDishName}
                        />


                    </div>

                    <div className="form-group">
                    <label className="tex">Cuisine:  </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.cuisine}
                        onChange={this.onChangeCuisine}
                        />
                        { cusinieb && <SmallError message={'Please enter cuisine '} /> }
                    </div>

                    <div className="form-group">
                    <label className="tex">Lbs:  </label>
                    <input
                        type="number"
                        className="form-control"
                        value={this.state.lbs}
                        onChange={this.onChangeLbs}
                        />
                        { lbsb && <SmallError message={'Please enter Lbs'} /> }
                    </div>

                    <div className="form-group">
                    <label className="tex">Quantity:  </label>
                    <input
                        type="number"
                        className="form-control"
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                        />

                        { quantityb && <SmallError message={'Please mention Quantity'} /> }
                    </div>

                    <div className="form-group">
                    <label className="tex">Selling Price: (If you want to donate ,please enter 0) </label>
                    <input
                        type="number"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        />

                        { priceb && <SmallError message={'Please mention the price'} /> }
                    </div>



                    <div className="form-group">
                    <label className="tex">Photo:  </label>
                    <input
                        style = {{padding:'10px', height: '50px'}}
                        type="file"
                        name="file"
                        className="form-control"
                         onChange={this.uploadImage}
                        />
                        <br>
                        </br>
                        <img src={this.state.photo} style={{ width: '300px',height:'200px' }} />
                    </div>

                    <div className="form-group">
                    <label className="tex">Address:  </label>
                            <div className="form-group">
                            <label className="tex">Street 1 :  </label>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Street Number "
                                value={this.state.address.street1}
                                onChange={this.onChangeAddressStreet1}
                                />
                                { street1b && <SmallError message={'Please mention street adress'} /> }
                            </div>
                            <div className="form-group">
                            <label className="tex">Street 2 :  </label>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Apartment number,street number etc "
                                value={this.state.address.street2}
                                onChange={this.onChangeAddressStreet2}
                                />
                                { street2b && <SmallError message={'Please mention aparmtent adress'} /> }
                            </div>


                            <label className="tex">State :   </label>
                            <select  value={this.state.address.state} onChange={this.onChangeAddressState} >
                            <option value="AK" >Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>




                            <div className="form-group">
                            <label className="tex">City :   </label>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Enter City "
                                value={this.state.address.city}
                                onChange={this.onChangeAddressCity}
                                />
                                { cityb && <SmallError message={'Please mention city'} /> }
                            </div>




                            <div className="form-group">
                            <label className="tex">ZipCode :   </label>
                                <input
                                type="text"
                                pattern="[0-9]{5}"
                                className="form-control"
                                placeholder="Enter Zipcode "
                                value={this.state.address.zipcode}
                                onChange={this.onChangeAddressZipCode}
                                />
                                { zipcodeb && <SmallError message={'Please mention zipcode'} /> }

                            </div>

                    </div>

                    <div className="form-group">

                        <input
                        type="submit" value ="Post"
                        className="btn"/>


                    </div>





            </form>

            { error && <Error message={'Error in Posting'} /> }
		    { posted && <Message message={'Success!! Your post has been uploaded!'} /> }
            </div>
            <Footer/>
            </div>
        );
        }

    }




}
