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
    <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
      <label>Name</label>
      {/* The 'name' attribute must match the {{variable}} in your EmailJS template */}
      <input type="text" name="user_name" required />
      
      <label>Email</label>
      <input type="email" name="user_email" required />
      
      <label>Title</label>
      <input type="text" name="title" required />

      <label>Content</label>
      <textarea name="content" required />
      
      <input type="submit" value="Send" style={{ marginTop: '10px' }} />
    </form>
  );
};

export default ContactUs;
