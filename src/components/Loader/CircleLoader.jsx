import React from 'react';

const styles = {
  width: '50px',
  height: '50px',
  border: '5px solid rgba(0, 0, 0, 0.2)',
  borderTopColor: 'rgb(255,44,85)',
  borderRadius: '50%',
  animation: "spin 1s infinite linear",
}

const CircleLoader = () => {
  return (
    <div style={styles}/>
  )
}

export default CircleLoader;