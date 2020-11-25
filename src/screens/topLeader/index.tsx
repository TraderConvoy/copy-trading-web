import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';
import Leader from './components/Leader';
import ModalStartCopy from './components/ModalStartCopy';

const TopLeader = () => {
  const urlImg = useContext(UrlImagesContext);

  return (
    <div className="top-leader">
      <ModalStartCopy />
      <div className="top-leader__header">
        <div className="title-wrapper">
          <p className="title">Top performing</p>
        </div>
        <div className="search-wrapper">
          <div className="search">
            <img src={`${urlImg}/icons/search.svg`} />
            <input placeholder="Search leader" />
          </div>
        </div>
      </div>
      <div className="top-leader__content">
        <Leader />
        <Leader />
        <Leader />
        <Leader />
        <Leader />
        <Leader />
        <Leader />
        <Leader />
        <Leader />
      </div>
    </div>
  );
};

export default TopLeader;
