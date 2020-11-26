import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';

const DoWantToExpert = () => {
  const urlImg = useContext(UrlImagesContext);

  return (
    <div className="do-want-to-expert">
      <div className="title-wrapper">
        <p className="title">Do you want to become an Expert</p>
        <p className="sub">Take 5% profit sharing from copier</p>
      </div>

      <div className="required-wrapper">
        <p className="title">Required</p>
        <div className="checkbox-wrapper">
          <div className="checkbox-content active">
            <div className="checkbox">
              <img src={`${urlImg}icons/checkbox-check.svg`} />
            </div>
            <p>$10000 is mininum</p>
          </div>
          <div className="checkbox-content active">
            <div className="checkbox">
              <img src={`${urlImg}icons/checkbox-check.svg`} />
            </div>
            <p>Trading volume $100000</p>
          </div>
          <div className="checkbox-content">
            <div className="checkbox">
              <img src={`${urlImg}icons/checkbox-check.svg`} />
            </div>
            <p>Trade account opened at least 30 days ago</p>
          </div>
        </div>
      </div>

      <div className="button-wrapper">
        <button>BECOME AN EXPERT</button>
        <p className="text-danger mt-2">You do not have permission</p>
      </div>
    </div>
  );
};

export default DoWantToExpert;
