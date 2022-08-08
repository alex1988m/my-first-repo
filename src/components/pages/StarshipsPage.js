import { useContext } from 'react';
import { ApiContext } from '../app/app';
import { ItemPage } from './ItemPage';

const STRATEGY = 'starships';

export const StarshipsPage = () => {
  const apiHandler = useContext(ApiContext);
  return <ItemPage apis={ apiHandler[STRATEGY] } strategy={ STRATEGY } />;
};