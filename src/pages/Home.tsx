import React from 'react';
import ImagesSlideshow from "../components/images/ImagesSlideshow";
import './Home.css';

const Home = () => {
    return (
        <div>
            <div className="home-container">
                <div className="slideshow">
                    <ImagesSlideshow/>
                </div>
            </div>
        </div>
    );
};

export default Home;