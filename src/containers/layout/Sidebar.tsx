import { ACTIVE_SIDEBAR } from 'constant/sidebar';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeSidebar = '' }) => {
  const [active, setActive] = useState(false);
  const userInfor = useSelector((state: any) => state.screen.userInfo.userInfor);
  const urlImg = useContext(UrlImagesContext);
  const sidebars = useMemo(
    () => [
      {
        name: 'Top leader',
        href: '/copy-trading/top-leaders',
        icon: 'flag.svg',
        active: ACTIVE_SIDEBAR.TOP_LEADER,
      },
      {
        name: 'Your History',
        href: '/copy-trading/your-history',
        icon: 'history.svg',
        active: ACTIVE_SIDEBAR.YOUR_HISTORY,
      },
      {
        name: 'Investment History',
        href: '/copy-trading/investment-history',
        icon: 'graph.svg',
        active: ACTIVE_SIDEBAR.INVESTMENT_HISTORY,
      },
      {
        name: 'Investment Calculator',
        href: '/copy-trading/investment-calculator',
        icon: 'calculator.svg',
        active: ACTIVE_SIDEBAR.INVESTMENT_CALCULATOR,
      },
      {
        name: 'Become an Expert',
        href: '/copy-trading/become-an-expert',
        icon: 'achievement.svg',
        active: ACTIVE_SIDEBAR.BECOME_AN_EXPERT,
      },
      {
        name: 'Expert management',
        href: '/copy-trading/expert-management',
        icon: 'settings.svg',
        active: ACTIVE_SIDEBAR.EXPERT_MANAGEMENT,
      },
      {
        name: 'Wallet',
        href: '/copy-trading/wallet',
        icon: 'wallet.svg',
        active: ACTIVE_SIDEBAR.WALLET,
      },
    ],
    [],
  );

  return (
    <div id="sidebar" className={`${active ? 'active' : ''}`}>
      <button className="toggle-menu" onClick={() => setActive(!active)}>
        <img src={`${urlImg}icons/menu.svg`} />
      </button>
      <div className="sidebar-wrapper">
        <div className="sidebar-list">
          <div className="logo">
            <p>
              FAST <span>MONEY</span> <span>Copy Trade</span>
            </p>
          </div>
          <div className="user-wrapper">
            {/* TODO: change avata */}
            <div className="avatar-wrapper">{userInfor?.avata ? 'A' : userInfor.username.split('')[0]}</div>
            <p className="username">{userInfor.username}</p>
          </div>
          <div className="wrapper-left">
            <p className="wallet">
              <NumberFormat
                thousandSeparator={true}
                displayType="text"
                prefix={'$'}
                decimalScale={2}
                value={userInfor.total_amount}
              />
            </p>
          </div>
          <div className="type-wrapper">
            <div className="type" style={{ cursor: 'pointer' }}>
              <p>Logout</p>
            </div>
          </div>
          <ul className="sidebar-content">
            {sidebars.map((el, i) => (
              <li className="sidebar-item" key={i}>
                <Link
                  to={el.href}
                  className={`sidebar-link
                  ${activeSidebar === el.active ? ' active' : ''}`}
                >
                  <span className="sidebar-icon">
                    <img src={`${urlImg}/icons/${el.icon}`} alt="icon-sidebar" />
                    <p>{el.name}</p>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
