import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App from './App';
import NavBar from './NavBar';
import reportWebVitals from './reportWebVitals';
import HeroShot from './HeroShot';
import Footer from './Footer';
import ContactForm from './ContactForm';
import Carrusel from './Carrusel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
      {/*<HeroShot/> */}
    {/* <App /> */}
    <Carrusel></Carrusel>
    <ContactForm/>
   <Footer/>
  </React.StrictMode>
 
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
