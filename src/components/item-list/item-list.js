import React from 'react';
import './item-list.css';
import { Spinner } from '../spinner/spinner';

const ItemListStrategy = ({ itemList, currentItemId, onItemSelected, strategy }) => {
  const handler = {
    people: item => item.name,
    planets: item => item.planetName,
    starships: item => item.name,
  };

  return itemList.map(item => {
    const className = ['list-group-item', 'list-group-item-action'];
    currentItemId === item.id && className.push('active');
    return (
      <li
        key={ item.id }
        className={ className.join(' ') }
        onClick={ () => onItemSelected(item.id) }
      >{ handler[strategy](item) }
      </li>
    );
  });
};

export const ItemList = ({ itemList, currentItemId, onItemSelected, strategy, loading }) => {

  const spinner = loading ? <Spinner /> : null;

  const listElement = itemList?.length > 0
    ? <ItemListStrategy
      itemList={ itemList }
      currentItemId={ currentItemId }
      onItemSelected={ onItemSelected }
      strategy={ strategy }
    />
    : null;

  return (
    <ul className='list-group'>
      { spinner }
      { listElement }
    </ul>
  );
};

