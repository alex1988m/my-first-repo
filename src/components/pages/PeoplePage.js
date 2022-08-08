import { useContext } from 'react';
import { ApiContext } from '../app/app';
import { ItemPage } from './ItemPage';
import { useParams } from 'react-router-dom';

const STRATEGY = 'people';

export const PeoplePage = () => {
  const { id } = useParams();
  const apiHandler = useContext(ApiContext);
  return <ItemPage apis={ apiHandler[STRATEGY] } strategy={ STRATEGY } id={ id } />;
};