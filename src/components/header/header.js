import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <div className='title d-flex'>
        <h1>
          <Link to='/'>Star DB</Link>
        </h1>
        <div className='pages d-flex'>
          <div className='btn-group' style={ { padding: '10px' } }>
            <button className='btn btn-primary'>
              <Link to='/people'>People</Link>
            </button>
            <button className='btn btn-primary'>
              <Link to='/planets'>Planets</Link>
            </button>
            <button className='btn btn-primary'>
              <Link to='/starships'>Starships</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}