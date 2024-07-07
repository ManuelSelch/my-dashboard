import React from 'react';

const Home = () => {
  return (
    <div
      className="hero"
      style={{ 
        backgroundImage: `url("/banner.jpg")` 
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className=''>
        <h1 className="text-5xl font-bold absolute bottom-10 left-10">Manuel Selch</h1>
      </div>
    </div>
  );
};

export default Home;
