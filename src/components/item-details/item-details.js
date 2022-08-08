import React from 'react';
import './item-details.css';
import { Spinner } from '../spinner/spinner';

function ItemDetailsStrategy({ url, currentItem, strategy }) {
  const handler = {
    people: [
      { itemInfo: currentItem => currentItem.name },
      { id: 1, key: 'Gender', val: currentItem => currentItem.gender },
      { id: 2, key: 'Birth year', val: currentItem => currentItem.birthYear },
      { id: 3, key: 'Eye color', val: currentItem => currentItem.eyeColor },
    ],
    planets: [
      { itemInfo: currentItem => currentItem.planetName },
      { id: 1, key: 'Diameter', val: currentItem => currentItem.diameter },
      { id: 2, key: 'Population', val: currentItem => currentItem.population },
      { id: 3, key: 'Rotation period', val: currentItem => currentItem.rotationPeriod },
    ],
    starships: [
      { itemInfo: currentItem => currentItem.name },
      { id: 1, key: 'Model', val: currentItem => currentItem.model },
      { id: 2, key: 'Manufacturer', val: currentItem => currentItem.manufacturer },
      { id: 3, key: 'Cost in credits', val: currentItem => currentItem.costInCredits },
      { id: 4, key: 'Length', val: currentItem => currentItem.length },
      { id: 5, key: 'Crew', val: currentItem => currentItem.crew },
      { id: 6, key: 'Passengers', val: currentItem => currentItem.passengers },
      { id: 7, key: 'Cargo capacity', val: currentItem => currentItem.cargoCapacity },
    ],
  };

  const infoData = handler[strategy];
  const info = infoData.shift().itemInfo(currentItem);
  const metaInfo = infoData.map(meta => (
    <li key={ meta.id } className='list-group-item'>
      <span>{ meta.key }: </span><span> { meta.val(currentItem) }</span>
    </li>
  ));

  return (
    <div className='item-details d-flex'>
      <img alt='' src={ url } />
      <div>
        <h1>{ info }</h1>
        <ul className='list-group list-group-flush'>
          { metaInfo }
          {/*<ErrorButton />*/ }
        </ul>
      </div>
    </div>
  );
}

const ItemDetails = ({ url, currentItem, strategy, loading }) => {

  // if (error) return <Error />;
  if (loading) return <Spinner />;
  if (!currentItem) return <AbsentItem />;
  return <ItemDetailsStrategy url={ url } currentItem={ currentItem } strategy={ strategy } />;
};

export default ItemDetails;

const AbsentItem = () => {
  return (<h3 style={ { marginTop: '20px' } }>Select an item!</h3>);
};