import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../components/Button';
const PropertyPopUp = ({ property, onClose }) => {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true, // Center the current slide
    };
    return (
        <>
        <div className='blur-background'></div>
        <div className="popup">
            <center><button className='button-home' onClick={ onClose }>Close Property Details</button></center>
            <Slider {...sliderSettings}>
                {property.propertyData.photos && property.propertyData.photos.map((photoUrl, index) => (
                    <div key={index}>
                    <center><img
                      src={photoUrl}
                      alt={`Property Photo ${index + 1}`}
                      style={{
                        width: '75%',
                        objectFit: 'cover',
                      }}
                    /></center> 
                  </div>
                ))}
            </Slider>
            <h2>{property.propertyData.address}</h2>
            <p>Bedrooms: {property.propertyData.bedrooms}</p>
            <p>Bathrooms: {property.propertyData.bathrooms}</p>
            <p>{property.propertyData.description}</p>
            <Button to='/contactus' text='Contact Us About This Property' className='button-home' />
        </div>
        </>
    )
}
export default PropertyPopUp;