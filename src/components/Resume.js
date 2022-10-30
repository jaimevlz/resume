import React from 'react';

const Resume = (props) => {
  const myExperience = (
    <div>
      {props.resume.map((res) =>
        <div className='item' key={res.resumeTitle}>
          <p>{res.resumeDescription}</p>
        </div>
      )}
    </div>
  );
  return (
    <div className='title'>
      <i className='fa fa-book'></i>
      <h2>RESUME</h2>
      {myExperience}
    </div>
  )
};

export default Resume;
