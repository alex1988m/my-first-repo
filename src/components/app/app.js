import React from 'react';
import './app.css';
import { SwapiService } from '../../services/SwapiService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RandomPlanet } from '../random-planet/random-planet';
import { Header } from '../header/header';
import { PeoplePage } from '../pages/PeoplePage';
import { PlanetsPage } from '../pages/PlanetsPage';
import { StarshipsPage } from '../pages/StarshipsPage';

const swapi = new SwapiService();
const apiHandlers = {
  people: {
    getItemList: swapi.getAllPeople,
    getItem: swapi.getPerson,
  },
  planets: {
    getItemList: swapi.getAllPlanets,
    getItem: swapi.getPlanet,
  },
  starships: {
    getItemList: swapi.getAllStarships,
    getItem: swapi.getStarship,
  },
};
export const ApiContext = React.createContext(apiHandlers);

const App = () => {
  return (
    <div className='application'>
      <ApiContext.Provider value={ apiHandlers }>
        <Router>
          <Header />
          <RandomPlanet />
          <Routes>
            {/*<Route path='/' element={ <h1>Welcome to StarDB!</h1> }>*/ }
            <Route path='/people'>
              <Route path=':id' element={ <PeoplePage /> } />
            </Route>
            <Route path='planets' element={ <PlanetsPage /> } />
            <Route path='starships' element={ <StarshipsPage /> } />
            {/*</Route>*/ }
          </Routes>
        </Router>
      </ApiContext.Provider>
    </div>
  );
};

export default App;
