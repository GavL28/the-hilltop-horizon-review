import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // The parameters are: Service ID, Template ID, the form element, and your Public Key
    emailjs.sendForm(
        'service_56s650g', 
        'template_itfc32q', 
        form.current, 
        { publicKey: 'wWQVtzER9hGll0lrd' }
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert('Message sent successfully!');
          e.target.reset(); // Clear the form after sending
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send the message, please try again.');
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="contact-form">
      <label htmlFor="contact-name">Name</label>
      <input id="contact-name" type="text" name="user_name" required />
      
      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" type="email" name="user_email" required />
      
      <label htmlFor="contact-title">Title</label>
      <input id="contact-title" type="text" name="title" required />

      <label htmlFor="contact-content">Message</label>
      <textarea id="contact-content" name="content" rows="5" required />
      
      <input type="submit" value="Send Message" />
    </form>
  );
};

export default ContactUs;
