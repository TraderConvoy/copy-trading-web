import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';

const Page404 = () => {
  const urlImg = useContext(UrlImagesContext);

  return (
    <div className="become-an-expert" style={{ background: '#13183d' }}>
      <div className="become-an-expert__content" style={{ margin: '200px auto', width: '956px' }}>
        <div className="section-expert">
          <div className="become-success">
            <div className="title-wrapper">
              <p className="title">Page Not Found</p>
              <p className="sub">Please try another link!</p>
            </div>
          </div>
        </div>
        <img className="become-icon" src={`${urlImg}icons/become-an-expert.svg`} alt="become-an-expert" />
      </div>
    </div>
  );
};

export default React.memo(Page404);
