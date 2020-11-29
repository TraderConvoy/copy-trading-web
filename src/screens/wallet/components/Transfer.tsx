import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';

const Transfer = () => {
  const urlImg = useContext(UrlImagesContext);

  return (
    <div className="transfer">
      <div className="real-account">
        <img className="arrow" alt="arrow" src={`${urlImg}icons/rounded-arrow.svg`} />
        <p className="name">Balance of Real account</p>
        <p>$ 100</p>
      </div>
      <div className="transfer-input">
        <img className="arrow" alt="arrow" src={`${urlImg}icons/rounded-arrow.svg`} />
        <p>Transfer</p>
        <div className="input-wrapper">
          <div className="input">
            <input />
            <p className="currency">USD</p>
          </div>
          <div className="button">
            <button>Transfer</button>
          </div>
        </div>
      </div>
      <div className="copy-trade-account">
        <p className="name">Balance of Copy trade account</p>
        <p>$ 0</p>
      </div>
    </div>
  );
};

export default Transfer;
