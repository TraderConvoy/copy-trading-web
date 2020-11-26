import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';

const BecomeSuccess = () => {
  const urlImg = useContext(UrlImagesContext);

  return (
    <div className="become-success">
      <div className="check-done">
        <img src={`${urlImg}icons/checkbox-check.svg`} alt="check" />
      </div>
      <div className="title-wrapper">
        <p className="title">Congratulation</p>
        <p className="sub">You become an Expert!</p>
      </div>
      <div className="button-wrapper">
        <button>BACK TO TRADING ROOM</button>
      </div>
    </div>
  );
};

export default BecomeSuccess;
