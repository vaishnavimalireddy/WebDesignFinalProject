import React, {Component} from 'react';
import Header from './header.component';
import Footer from './footer.component';
import './homepage.css';
import company1 from './images/company1.png';
import company2 from './images/company2.png';
import company3 from './images/company3.png';
import cause from './images/cause.png';
import respect from './images/respect.png';
import clock from './images/clock.png';
import cover from './images/cover.png';

class Homepage extends Component {
  render(){
  localStorage.removeItem('cart');
    return(
      <div>
        <Header/>
        <div className="appBody">
          <div className="section1">
            <div className="tittle">
              <h1 className="heading">With <span className="highlight">Carrier</span>, sell or buy left over food!</h1>
              <p className="subheading">Get in touch for service at your your door step.</p>
              <span><button className="button">BUY</button></span>
              <span><button className="button">SELL</button></span>
            </div>
            <img src={cover} alt="Cover Image" className ="cover" />
          </div>
          <section className="section2 secFeature" >
            <h3 className="secheading">Rely on Us for</h3>
            <div className ="imageContainer">
              <div className="imageDiv">
                <img src={clock} alt="Clock" className ="feature" />
                <p>Quick Delivery</p>
              </div>
              <div className="imageDiv">
                <img src={cause} alt="Cause" className ="feature" />
                <p>Serve a Cause</p>
              </div>
              <div className="imageDiv">
                <img src={respect} alt="Respect" className ="feature" />
                <p>Trust and Reliablity</p>
              </div>
            </div>
          </section>
          <section className="section2" >
            <h3 className="secheading">Our Story</h3>
            <p>In the United States, we throw out billions of dollars of food every year. Globally, the United Nations estimates that around one third of food produced for human consumption is lost or wasted. The key with using food waste is to challenge yourself to think differently. Thus, we founded this organization with a key moto to reach out consumers and suppliers for better management of left over food. Today, here we stand with over 500 delivery staff and average wait time of 15 min. We are trusted by some of the biggest organizations.</p>
            <div className ="imageContainer">
              <img src={company1} alt="Google" className ="company" />
              <img src={company2} alt="Slack" className ="company" />
              <img src={company3} alt="JP Morgan" className ="company companyLong" />
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Homepage;
