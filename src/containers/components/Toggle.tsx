import React from 'react';

const Toggle = ({ active, onClick }) => {
  return (
    <div className="toggle-wrapper">
      <div className={`toggle ${active ? 'active' : ''}`}>
        <span className="point" />
        <button className="background" onClick={() => onClick(!active)} />
      </div>
    </div>
  );
};

export default Toggle;
