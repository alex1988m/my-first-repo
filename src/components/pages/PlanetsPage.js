import { useContext } from 'react';
import { ApiContext } from '../app/app';
import { ItemPage } from './ItemPage';

const STRATEGY = 'planets';

export const PlanetsPage = () => {
  const apiHandler = useContext(ApiContext);
  return <ItemPage apis={ apiHandler[STRATEGY] } strategy={ STRATEGY } />;
};