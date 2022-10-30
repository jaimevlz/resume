import React from 'react';
import Social from './Social';
import foto from '../images/foto.jpg'

const About = ({name, profession, bio, address, social}) => {
  return(
    <div className='bio'>
      <div className='avatar'>
        <img src={foto} alt={name} />
      </div>
      <div className='title'>
        <h1>{name}</h1>
        <h2>{profession}</h2>
      </div>
      <div className='desc'>
        <p>{bio}</p>
      </div>
      <div className='address'>
        <p>{address}</p>
      </div>
      <Social social={social} />
    </div>
  );
};

export default About;
