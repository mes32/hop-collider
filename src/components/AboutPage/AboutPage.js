import React from 'react';

import './AboutPage.css';

// This page provides a short summary of the applications purpose
const AboutPage = () => (
    <div className="about-page-container">
        <div className="about-page">
            {/* <h2>Application Overview</h2>
            <p>
                There are over one hundred and forty different varieties of hops used for brewing beer. Each variety has its own unique flavor and character due to its chemical composition. Hop varieties have different concentrations of chemical compounds that produce bitterness as well as different aromatic essential oils. This app allows brewers to visualize and compare the profiles of different hop varieties to help them pick the perfect hops for their next beer recipe. 
            </p> */}
            <div className="about-page-images">
                <img src="images/Hops.jpeg" alt="Hops" />
                <img src="images/Oasthouse.jpeg" alt="Oasthouse" />
                <img src="images/IPA.jpeg" alt="IPA" />
            </div>
            <p className="caption">Photos by ELEVATE from Pexels</p>
        </div>
    </div>
);

export default AboutPage;
