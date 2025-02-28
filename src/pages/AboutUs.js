import  Button from '../components/Button';
import edwinPortrait from '../assets/edwin-portrait.png';

const AboutUs = () => {
    return(
        <>
        <div className="about-container">
            <img src={ edwinPortrait } alt='portrait' className='edwin-portrait' />
            <div className='about-info'>
                <h2 className="RRtitle-h2">Meet Robert Reyes</h2>
                <h3 className='RRtitle-h3'>Broker and CEO</h3>
                <div className="edwin-bio"> 
                        <p>Allow us to introduce you to Robert Reyes, 
                            the driving force behind Bella Bella Realty, 
                            a premier real estate agency dedicated to turning 
                            your property dreams into a reality. With a 
                            reputation for excellence, Robert is a trusted name 
                            in the industry, with a wealth of experience and numerous 
                            successful transactions to his name. Robert Reyes has been 
                            at the forefront of the real estate industry for several successful 
                            years. His journey has been marked by unwavering commitment and 
                            an innate ability to exceed client expectations. Whether you're in the 
                            market to buy, sell, or invest, Robert's dedication to your success knows 
                            no bounds. Whether you are looking to invest in real estate domestically or internationally,
                            Mr. Reyes will be with you every step of the way!</p>
                </div>
                <Button className='aboutus-contact' to='/contactus' text='Contact Us Today!' />
            </div>
        </div>
        </>
    );
}
export default AboutUs;