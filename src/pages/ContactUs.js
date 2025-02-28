import phoneIcon from '../assets/phone-icon.png';
import emailIcon from '../assets/mail-icon.png';
import ContactForm from '../components/ContactForm';

const ContactUs = () => {
    return(
        <>
        <h1 className="contact-h1">Contact Us</h1>
        <h2 className="contact-h2">Your Dream Home Awaits - Connect with Us Now!</h2>
        <div className="contact-container">
            <div className="contact-info">
                <div className='contact-title'>
                    <h2>Contact Information</h2>
                    <h2>Robert Reyes</h2>
                    <h3>Broker/CEO</h3>
                </div>

                <div className='phone-num'>
                    <img src={ phoneIcon } alt='phoneicon' className='phone-icon' />
                    <h3>+1 (786)-915-1821</h3>
                </div>

                <div className='email-add'>
                <img src={ emailIcon } alt='emailicon' className='email-icon' />
                <h3>reyesrob@bellabellarealty.com</h3>
                </div>
            </div>

            <div className="contact-form">
                <h2>Send Us a Message!</h2>
                <ContactForm />
            </div>
        </div>
        </>
    );
}
export default ContactUs;