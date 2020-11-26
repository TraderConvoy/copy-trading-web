import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';
// import DoWantToExpert from './components/DoWantToExpert';
import BecomeSuccess from './components/BecomeSuccess';

const BecomeAnExpert = () => {
  const urlImg = useContext(UrlImagesContext);

  return (
    <div className="become-an-expert">
      <div className="become-an-expert__header">
        <div className="title-wrapper">
          <p className="title">Become an Expert</p>
        </div>
      </div>
      <div className="become-an-expert__content">
        <img className="become-icon" src={`${urlImg}icons/become-an-expert.svg`} alt="become-an-expert" />
        <div className="section-expert">
          {/* <DoWantToExpert /> */}
          <BecomeSuccess />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BecomeAnExpert);
