import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useState } from 'react';
import BecomeSuccess from './components/BecomeSuccess';
import DoWantToExpert from './components/DoWantToExpert';

const BecomeAnExpert = () => {
  const urlImg = useContext(UrlImagesContext);
  const [success, setSuccess] = useState(false);

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
          {success ? <BecomeSuccess /> : <DoWantToExpert onBecome={() => setSuccess(true)} />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BecomeAnExpert);
