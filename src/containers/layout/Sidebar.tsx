import { ACTIVE_SIDEBAR } from 'constant/sidebar';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeSidebar = '' }) => {
  const urlImg = useContext(UrlImagesContext);
  const sidebars = useMemo(
    () => [
      {
        name: 'Top leader',
        href: '/top-leader',
        icon: 'flag.svg',
        active: ACTIVE_SIDEBAR.TOP_LEADER,
      },
      {
        name: 'Your History',
        href: '/your-history',
        icon: 'history.svg',
        active: ACTIVE_SIDEBAR.YOUR_HISTORY,
      },
      {
        name: 'Investment History',
        href: '/investment-history',
        icon: 'graph.svg',
        active: ACTIVE_SIDEBAR.INVESTMENT_HISTORY,
      },
      {
        name: 'Investment Calculator',
        href: '/investment-calculator',
        icon: 'calculator.svg',
        active: ACTIVE_SIDEBAR.INVESTMENT_CALCULATOR,
      },
      {
        name: 'Become an Expert',
        href: '/become-an-expert',
        icon: 'achievement.svg',
        active: ACTIVE_SIDEBAR.BECOME_AN_EXPERT,
      },
      {
        name: 'Expert management',
        href: '/export-management',
        icon: 'settings.svg',
        active: ACTIVE_SIDEBAR.EXPERT_MANAGEMENT,
      },
    ],
    [],
  );

  return (
    <div id="sidebar">
      <div className="sidebar-wrapper">
        <div className="user-wrapper">
          <div className="avatar" />
          <div className="username">
            <p>nguyenmanhdung@gmail.com</p>
          </div>
        </div>
        <div className="sidebar-list">
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
                  </span>
                  {el.name}
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
