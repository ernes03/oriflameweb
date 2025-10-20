import React, { useState, memo } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import data from './data/contactForm.json';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_4kctz2s',          // Reemplaza con tu service_id
        'template_60ncqni',         // Reemplaza con tu template_id
        formData,
        'cMNawYjh7oKhgNyrK'         // Reemplaza con tu Public Key
      );
      setStatusMessage('¡Mensaje enviado exitosamente!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatusMessage('Ocurrió un error al enviar el mensaje.');
      console.error('Error:', error);
    }
  };

  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
      <h2 id="contact-title">{data.title}</h2>
      <p className="contact-desc">{data.description}</p>
      <label>Nombre</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder={data.placeholders.name}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder={data.placeholders.email}
      />

      <label>Mensaje</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder={data.placeholders.message}
      ></textarea>

      <button type="submit">{data.cta}</button>
      <p className="status-message">{statusMessage}</p>
    </form>
    </div>
    </section>
  );
}

export default memo(ContactForm);
