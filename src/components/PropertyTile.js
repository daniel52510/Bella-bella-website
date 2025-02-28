import React, { useState } from 'react';
import PropertyPopUp from './PropertyPopUp';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertyTile = ({ property }) => {
    const [showPopup, setShowPopup ] = useState(false);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    const handleTileClick = (bool) => {
        setShowPopup(bool);
    };
    return (
        <div className='property-tile' onClick={() => handleTileClick(true)}>
            <Slider {...sliderSettings}>
                {property.propertyData.photos && property.propertyData.photos.map((photoUrl, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key = { index }>
                        <img src={ photoUrl } alt={`Property Photo ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '200px' }}/>
                    </div>
                ))}
            </Slider>
            <h3>{property.propertyData.address}</h3>
            <p>Bedrooms: {property.propertyData.bedrooms}</p>
            <p>Bathrooms: {property.propertyData.bathrooms}</p>
            {showPopup && <PropertyPopUp property={property} onClose={ (e) => { e.stopPropagation(); handleTileClick(false); } } />}
        </div>
    )
}
export default PropertyTile;