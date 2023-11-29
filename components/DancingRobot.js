import React from 'react';

const DancingRobot = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '-50px',
      left: '50%',
      transform: 'translateX(-50%)',
    }}>
      <div id="robot-body" style={{
        width: '50px',
        height: '100px',
        backgroundColor: 'gray',
        border: '1px solid black',
      }} />
      <div id="robot-left-arm" style={{
        width: '20px',
        height: '50px',
        backgroundColor: 'gray',
        position: 'absolute',
        top: '50px',
        left: '15px',
        border: '1px solid black',
      }} />
      <div id="robot-right-arm" style={{
        width: '20px',
        height: '50px',
        backgroundColor: 'gray',
        position: 'absolute',
        top: '50px',
        right: '15px',
        border: '1px solid black',
      }} />
      <div id="robot-left-leg" style={{
        width: '20px',
        height: '50px',
        backgroundColor: 'gray',
        position: 'absolute',
        top: '100px',
        left: '0',
        border: '1px solid black',
      }} />
      <div id="robot-right-leg" style={{
        width: '20px',
        height: '50px',
        backgroundColor: 'gray',
        position: 'absolute',
        top: '100px',
        right: '0',
        border: '1px solid black',
      }} />
    </div>
  );
};

export default DancingRobot;
