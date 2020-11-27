import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';

export const ButtonStart = () => {
  const urlImg = useContext(UrlImagesContext);
  return (
    <button className="button-start">
      <img src={`${urlImg}icons/start.svg`} />
      Start
    </button>
  );
};

export const ButtonPause = () => {
  const urlImg = useContext(UrlImagesContext);
  return (
    <button className="button-pause">
      <img src={`${urlImg}icons/pause.svg`} />
      Pause
    </button>
  );
};

export const ButtonStop = () => {
  const urlImg = useContext(UrlImagesContext);
  return (
    <button className="button-stop">
      <img src={`${urlImg}icons/stop.svg`} />
      Stop
    </button>
  );
};
