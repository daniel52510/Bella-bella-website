import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const ContactForm = () => {

  const [nameVal, setNameVal] = useState('');
  const [subjectVal, setSubjectVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [messageVal, setMessageVal] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, 'mail');


  const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Potential Client Inquiry from ${nameVal}</title>
        </head>
        <body>
            <h2>Client Information</h2>
            <p><strong>Name:</strong> ${nameVal}</p>
            <p><strong>Email:</strong> ${emailVal}</p>
            <p><strong>Subject:</strong> ${subjectVal}</p>
            
            <h2>Message</h2>
            <p>${messageVal}</p>
        </body>
        </html>
    `;

      const sendEmail = () => {
        // Validate the form before sending the email
        if (!nameVal) {
          setNameError('Name is required');
        } else {
          setNameError('');
        }
    
        if (!emailVal) {
          setEmailError('Email is required');
        } else {
          setEmailError('');
        }
    
        if (!subjectVal) {
          setSubjectError('Subject is required');
        } else {
          setSubjectError('');
        }
    
        if (!messageVal) {
          setMessageError('Message is required');
        } else {
          setMessageError('');
        }
        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
          return;
        }
  
      // Add a new document to the 'mail' collection
       addDoc(colRef, {
        to: ['danielblazquez640@gmail.com'],
        message: {
          subject: subjectVal,
          text: messageVal,
          html: emailHTML,
        }
      });
    alert('Thank you!, we will get back to you as soon as possible!')
    setNameVal('');
    setSubjectVal('');
    setEmailVal('');
    setMessageVal('');
  }
  return (
    <div className="form-container">
      <div className='input-container'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={nameVal}
          onChange={(e) => setNameVal(e.target.value)}
        />
        <span className="error">{nameError}</span>
      </div>
      <div className='input-container'>
        <label htmlFor='user_email'>Email</label>
        <input
          type='email'
          name='user_email'
          id='user_email'
          value={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
        />
        <span className="error">{emailError}</span>
      </div>
      <div className='input-container'>
        <label htmlFor='user_subject'>Subject</label>
        <input
          type='text'
          name='user_subject'
          id='user_subject'
          value={subjectVal}
          onChange={(e) => setSubjectVal(e.target.value)}
        />
        <span className="error">{subjectError}</span>
      </div>
      <div className='input-container'>
        <label htmlFor='message'>Message</label>
        <textarea
          name='message'
          id='message'
          rows='6'
          value={messageVal}
          onChange={(e) => setMessageVal(e.target.value)}
        />
        <span className="error">{messageError}</span>
        <button className='submit-button' onClick={sendEmail}>Submit</button>
      </div>
    </div>
  );
};
export default ContactForm;
