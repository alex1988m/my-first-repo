import React from 'react';
import './spinner.css';

export const Spinner = () => {
  return (
    <div className='spinner-grow text-muted'
         style={ { marginTop: '100px', marginLeft: '100px' } }
    ></div>
  );
};