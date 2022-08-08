import React, { useEffect, useState } from 'react';
import { ItemList } from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';

function getItemUrl({ strategy, currentItemId }) {
  const urlHandler = {
    people: 'characters',
    planets: 'planets',
    starships: 'starships',
  };
  return `https://starwars-visualguide.com/assets/img/${ urlHandler[strategy] }/${ currentItemId }.jpg`;
}

function useMountItemList({ getItemList, setItemList, setLoadingList, setLoadingDetails }) {
  useEffect(
    () => {
      async function setItemListEffect() {
        setTo(true, [setLoadingList, setLoadingDetails]);
        const itemList = await getItemList();
        setItemList(itemList);
        setTo(false, [setLoadingDetails, setLoadingList]);
      }

      setItemListEffect();
    },
    [],
  );
}

function setTo(param, setters) {
  setters.map(setter => setter(param));
}

function useUpdateCurrentId({ getItem, currentItemId, strategy, setLoadingDetails, setCurrentItem, setItemUrl }) {
  useEffect(
    () => {
      async function getData() {
        if (currentItemId) {
          setLoadingDetails(true);
          const currentItem = await getItem(currentItemId);
          const itemUrl = getItemUrl({ strategy, currentItemId });

          setCurrentItem(currentItem);
          setItemUrl(itemUrl);
          setLoadingDetails(false);
        }
      }

      getData();
    },
    [currentItemId],
  );
}

export const ItemPage = ({ apis, strategy, id }) => {
  const { getItemList, getItem } = apis;
  const [itemList, setItemList] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentItemId, setCurrentItemId] = useState(id);
  const [itemUrl, setItemUrl] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  //mount
  useMountItemList({ getItemList, setItemList, setLoadingList, setLoadingDetails });
  useUpdateCurrentId({ getItem, currentItemId, strategy, setLoadingDetails, setCurrentItem, setItemUrl });

  return (
    <div className='row mb2'>
      <div className='col-md-6'>
        <ItemList
          itemList={ itemList }
          onItemSelected={ id => setCurrentItemId(id) }
          currentItemId={ currentItemId }
          strategy={ strategy }
          loading={ loadingList }
        />
      </div>
      <div className='col-md-6'>
        <ItemDetails
          currentItemId={ currentItemId }
          currentItem={ currentItem }
          url={ itemUrl }
          strategy={ strategy }
          loading={ loadingDetails }
        />
      </div>
    </div>
  );
};