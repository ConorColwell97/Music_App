import './Home.css';
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
      <div className='HomeDiv'>
          <h1 className='HomeHeader'>
            🎵 Music App
          </h1>
          <h1 className='HomeHeader'>
              Home Page
          </h1>
          <div className='ButtonDiv'>
            <button className='Buttons' onClick={() => navigate("/Artists")}>Go to Artists</button>
            <button className='Buttons' onClick={() => navigate("/Albums")}>Go to Albums</button>
            <button className='Buttons' onClick={() => navigate("/Songs")}>Go to Songs</button>
          </div>
      </div>
    );
};

export default Home;