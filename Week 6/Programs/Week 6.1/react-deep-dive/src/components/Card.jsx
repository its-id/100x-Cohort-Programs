import React from 'react';

//the innerComponent is a seperate component itself.
const Card = ({ innerComponent }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      {innerComponent}
    </div>
  );
};

export default Card;
