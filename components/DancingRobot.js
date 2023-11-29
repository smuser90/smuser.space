import React from 'react';

const DancingRobot = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '-50px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: 'orange',
    }} />
  );
};

export default DancingRobot;
