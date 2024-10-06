import React, { useState, useEffect } from 'react';
import data from './data/heroshot.json'; // Asegúrate de que esta ruta sea correcta
import HeroImage1 from './media/HeroImage1.jpg';
import HeroImage2 from './media/HeroImage2.jpg';
import HeroImage3 from './media/HeroImage3.jpg';

// Mapeo de imágenes importadas
const imageMap = {
    "HeroImage1.jpg": HeroImage1,
    "HeroImage2.jpg": HeroImage2,
    "HeroImage3.jpg": HeroImage3,
};

// Actualiza los datos para incluir las rutas de las imágenes importadas
const updatedData = data.map(item => ({
    ...item,
    image: imageMap[item.image], // Asigna la imagen correcta
}));

const HeroShot = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentShot, setCurrentShot] = useState(updatedData[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % updatedData.length);
        }, 6000); // Cambia cada 6 segundos

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentShot(updatedData[currentIndex]);
    }, [currentIndex]);

    return (
        <div className="hero-shot">
            <h1>{currentShot.title}</h1>
            <img src={currentShot.image} alt={currentShot.title} />
        </div>
    );
};

export default HeroShot;
