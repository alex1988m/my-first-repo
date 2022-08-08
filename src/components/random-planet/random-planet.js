import React, { Component } from 'react';
import './random-planet.css';
import { SwapiService } from '../../services/SwapiService';
import { Spinner } from '../spinner/spinner';
import { Error } from '../error/error';

export class RandomPlanet extends Component {
  state = {
    planet: {
      id: null,
      population: null,
      rotationPeriod: null,
      diameter: null,
      planetName: null,
    },
    loading: true,
    error: false,
  };

  swapiService = new SwapiService();

  componentDidMount() {
    this.interval = setInterval(this.updatePlanet, 7000);
    console.log(this.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updatePlanet = async () => {
    const id = Math.floor(Math.random() * 12 + 3);
    let result;
    try {
      result = await this.swapiService.getPlanet(id);
    } catch (e) {
      this.onError(e);
    }
    this.setState({ planet: { ...result }, loading: false });
  };

  onError(err) {
    this.setState({
      error: true,
      loading: false,
    });
  }

  render() {
    const { planet, loading, error } = this.state;
    const imageUrl = this.getImageUrl(planet);
    const errorComponent = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = (error || loading) ? null : <PlanetView
      planet={ planet }
      url={ imageUrl }
    />;
    return (
      <div className='random-planet d-flex'>
        { errorComponent }
        { spinner }
        { content }
      </div>
    );
  }

  getImageUrl(planet) {
    return `https://starwars-visualguide.com/assets/img/planets/${ planet.id }.jpg`;
  }
}

const PlanetView = ({ planet, url }) => {
  const { diameter, rotationPeriod, population, planetName } = planet;
  return (
    <React.Fragment>
      <img alt='' src={ url } />
      <div>
        <h1>{ planetName }</h1>
        <ul className='random-planet-details list-group list-group-flush'>
          <li className='list-group-item'>
            <span>Population</span> <span>{ population }</span>
          </li>
          <li className='list-group-item'>
            <span>Rotation Period</span> <span>{ rotationPeriod }</span>
          </li>
          <li className='list-group-item'>
            <span>Diameter</span> <span>{ diameter }</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};