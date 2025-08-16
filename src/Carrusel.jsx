import React from 'react';
import './Carrusel.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta



const Carrusel = () => {
  return (
    
      
      <div style={{ position: 'relative', zIndex: 0 }}>

        <section className='divCarrusel'>
            <img src={process.env.PUBLIC_URL + '/evangelio1.jpg'} alt="Producto 1" />
            <img src={process.env.PUBLIC_URL + '/evangelio2.jpg'} alt="Producto 2" />
            <img src={process.env.PUBLIC_URL + '/evangelio3.jpg'} alt="Producto 3" />
            <img src={process.env.PUBLIC_URL + '/evangelio4.jpg'} alt="Producto 4" />
            <img src={process.env.PUBLIC_URL + '/evangelio5.jpg'} alt="Producto 5" />

        </section>
         

      </div>
       
           
        
    

);

};

export default Carrusel;