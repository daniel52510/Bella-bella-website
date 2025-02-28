import Button from '../components/Button.js';
import RecentProperties from '../components/RecentProperties.js';
import backgroundVideo from '../assets/miami-video.mp4';
import backgroundPic from '../assets/miami-skyline.jpg';
const HomePage = ({ menuOpen }) => {

    return(
      <> 
        <div className='overlay'></div>
      <div className="HomePage">
            <img className='miami-pic' src={ backgroundPic } alt='miami-pic' />
            <h1 className='home-header'>Find Your Forever Home with Bella Bella Realty</h1>
        <div className='button-container'>
          <Button className='button-home' to='/listings' text='View Properties' />
          <Button className='button-home'to='/contactus' text='Find your Home Value' />
        </div>
        {/* Problem in Recent Properties */}
    {/*<RecentProperties />*/}
    </div>
    {window.innerWidth > 800 && (
        <video autoPlay loop muted className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
    );
}
export default HomePage;