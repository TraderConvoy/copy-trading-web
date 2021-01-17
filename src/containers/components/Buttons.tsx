import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';

export const ButtonStart = ({ ...rest }) => {
  const urlImg = useContext(UrlImagesContext);
  return (
    <button {...rest} className="button-start">
      <img src={`${urlImg}icons/start.svg`} />
      Start
    </button>
  );
};

export const ButtonPause = ({ ...rest }) => {
  const urlImg = useContext(UrlImagesContext);
  return (
    <button {...rest} className="button-pause">
      <img src={`${urlImg}icons/pause.svg`} />
      Pause
    </button>
  );
};

export const ButtonStop = ({ ...rest }) => {
  const urlImg = useContext(UrlImagesContext);
  return (
    <button {...rest} className="button-stop">
      <img src={`${urlImg}icons/stop.svg`} />
      Stop
    </button>
  );
};
