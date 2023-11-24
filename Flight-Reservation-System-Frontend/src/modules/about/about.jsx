// About.js

import React from 'react';
import './about.css';
import bonVoyageImage from './BonVoyage.jpeg'; // Import your image file

const About = () => {
  return (
    <div className="about-container">
      <div className="content-container">
        {/* First Row */}
        <div className="row-container">
          <div className="text-container">
            <h1 className="about-header">About Us: Bon Voyage</h1>
            <p className="welcome-text">
              Welcome to Bon Voyage – Your Gateway to Seamless Journeys!
            </p>
            <p className="intro-text">
              At Bon Voyage, we don't just book flights; we elevate your travel
              experience to new heights. Embark on a journey with us, where your
              comfort, convenience, and satisfaction take flight alongside you.
              We are more than just a flight reservation system; we are your
              travel companion, committed to making every voyage unforgettable.
            </p>
          </div>
          {/* <div className="image-container">
            <img
              src={bonVoyageImage}
              alt="Bon Voyage"
              className="bon-voyage-image"
              style={{ width: '200px', height: 'auto' }}
            />
          </div> */}
        </div>

        {/* Second Row */}
        <div className="text-container">
          <h2 className="story-header">Our Story</h2>
          <p className="story-text">
            Born out of a passion for seamless travel and a commitment to
            redefining the way you explore the world, Bon Voyage is more than a
            platform; it's a vision. We started with a simple idea: to create a
            flight reservation system that mirrors the joy, excitement, and
            wonder of your journeys.
          </p>
          <div className="separator"></div>
          <h1 className="story-header">What Sets Us Apart?</h1>
          <div className="sets-apart-section">
            <h2 className="sets-apart-subheader">Exceptional Service</h2>
            <p className="sets-apart-text">
              Bon Voyage is synonymous with unparalleled customer service. Our
              dedicated team works around the clock to ensure your every query is
              met with prompt and friendly assistance.
            </p>
          </div>
          <div className="separator"></div>
          <h1 className="mission-header">Our Mission</h1>
          <p className="mission-text">
            To redefine travel by providing a seamless, stress-free experience that
            turns every journey into an adventure. We strive to be the preferred
            choice for travelers worldwide, known for our reliability,
            transparency, and commitment to customer satisfaction.
          </p>
          <div className="separator"></div>
          <h1 className="join-us-header">Join Us on this Voyage</h1>
          <p className="join-us-text">
            Bon Voyage invites you to join us on this extraordinary journey.
            Whether you're a frequent flyer or planning a once-in-a-lifetime trip,
            we are here to transform your travel dreams into reality. Let's soar to
            new horizons together. Thank you for choosing Bon Voyage – Where Every
            Journey Begins and Adventure Awaits!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;