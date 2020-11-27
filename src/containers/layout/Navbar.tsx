import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const urlImg = useContext(UrlImagesContext);
  const history = useHistory();

  return (
    <div className="header-nav">
      <div className="nav-wrapper">
        <div className="nav-left">
          <div className="logo">
            <p onClick={() => history.push('/')}>
              FAST <span>MONEY</span>
            </p>
          </div>
        </div>
        <div className="nav-right">
          <div className="user-wrapper">
            <div className="avatar-wrapper">C</div>
            <p className="username">User name</p>
          </div>
          <div className="notification-wrapper">
            <div className="icon">
              <img src={`${urlImg}icons/bell.svg`} />
            </div>
            <p>Notification</p>
          </div>
          <div className="practice-account-wrapper">
            <div className="wrapper-left">
              <p>Practice Account</p>
              <p className="wallet">$ 23,694</p>
            </div>
            <div className="wrapper-right">
              <button className="dropdown">
                <img src={`${urlImg}/icons/dropdown-icon.svg`} alt="icon-header" />
              </button>
            </div>
          </div>
          <div className="type-wrapper">
            <div className="type">
              <p>IB</p>
            </div>
          </div>
          <div className="level-wrapper">
            <div className="level">
              <p>Level</p>
              <p>10</p>
            </div>
          </div>
          <div className="deposit-wrapper">
            <button>Deposit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
