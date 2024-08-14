import React from "react";

const Hero = () => {
    return (
        <div
            className="hero bg-no-repeat bg-cover"
            style={{ 
            backgroundImage: `url("/banner.jpg")`,
            backgroundPosition: 'center' 
            }}
        >
            <div className="hero-overlay bg-opacity-60"/>
            <h1 className="text-5xl font-bold absolute bottom-10 left-10 text-white">Manuel Selch</h1>
        </div>
    );
}

export default Hero;