import { ACTIVE_SIDEBAR } from 'constant/sidebar';
import ModalConfirm, { initializeModal } from 'containers/components/ModalConfirm';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserAmountAction, getUserInforAction } from 'screens/dashboard/ducks/actions';
import { formatter } from 'utils/utilities';

const Sidebar = ({ activeSidebar = '' }) => {
  const [active, setActive] = useState(false);
  const userInfor = useSelector((state: any) => state.screen.userInfo.userInfor);
  const [modalCf, setModalCf] = useState({ ...initializeModal });
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
        name: 'Wallet',
        href: '/copy-trading/wallet',
        icon: 'wallet.svg',
        active: ACTIVE_SIDEBAR.WALLET,
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
      // {
      //   name: 'Expert management',
      //   href: '/copy-trading/expert-management',
      //   icon: 'settings.svg',
      //   active: ACTIVE_SIDEBAR.EXPERT_MANAGEMENT,
      // },
    ],
    [],
  );
  const dispatch = useDispatch();
  const amount = useSelector((state: any) => state.screen.dashBoard.userAmount?.data);
  useEffect(() => {
    handleGetAmount();
    handleGetUserInfo();
  }, [sidebars]);

  useEffect(() => {
    setActive(false);
  }, [activeSidebar]);

  const handleGetAmount = () => {
    try {
      dispatch(getUserAmountAction({ source: 'COPY_TRADE' }, () => {}));
    } catch (error) {}
  };

  const handleGetUserInfo = () => {
    try {
      dispatch(getUserInforAction());
    } catch (error) {}
  };

  const closeModalConfirm = () => {
    setModalCf({ ...initializeModal });
  };

  const logOut = () => {
    setModalCf((oldState) => ({
      ...oldState,
      isOpen: true,
      title: 'Confirm',
      content: 'Are you sure you want to logout ?',
      cancelContent: 'Cancel',
      submitContent: 'Logout',
      handleCancel: () => closeModalConfirm(),
      handleSubmit: () => {
        localStorage.clear();
        window.location.replace(`/copy-trading/login`);
      },
    }));
  };
  return (
    <>
      <ModalConfirm
        isOpen={modalCf.isOpen}
        title={modalCf.title}
        content={modalCf.content}
        cancelContent={modalCf.cancelContent}
        submitContent={modalCf.submitContent}
        handleCancel={modalCf.handleCancel}
        handleSubmit={modalCf.handleSubmit}
        subContent=""
      />
      <div id="sidebar" className={`${active ? 'active' : ''}`}>
        <button className="toggle-menu" onClick={() => setActive(!active)}>
          <img src={`${urlImg}icons/menu.svg`} />
        </button>
        <div className="sidebar-wrapper">
          <div className="sidebar-list">
            <Link to={'/copy-trading/top-leaders'} style={{ textDecorationLine: 'none' }}>
              <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} style={{ width: '100%', marginLeft: '8%' }} />
                <p>Copy Trade</p>
              </div>
            </Link>
            <div className="user-wrapper">
              <div className="avatar-wrapper">
                {userInfor?.avatar ? userInfor?.avatar : userInfor?.username?.split('')[0]}
              </div>
              <p className="username">{userInfor?.username}</p>
            </div>
            <div className="wrapper-left">
              <p className="wallet">{formatter.format(amount || userInfor?.total_amount)} USD</p>
            </div>
            <hr />
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
            <hr />
            <div className="type-wrapper">
              <div className="type" style={{ cursor: 'pointer' }} onClick={logOut}>
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
