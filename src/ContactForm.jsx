import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_ov5y18m',          // Reemplaza con tu service_id
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
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contáctanos</h2>
      <label>Nombre</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Mensaje</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit">Enviar</button>
      <p className="status-message">{statusMessage}</p>
    </form>
  );
}

export default ContactForm;
