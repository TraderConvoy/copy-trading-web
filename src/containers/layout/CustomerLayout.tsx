import 'moment/locale/vi';
import React from 'react';
import Brand from './Brand';
import Header from './Header';
import SideBar from './Sidebar';

const CustomerLayout = (props: any) => {
  return (
    <div className="content-wrapper">
      <div className="wrapper-top">
        <Header />
        <Brand />
      </div>
      <div className="wrapper-middle">
        <div className="wrapper-left">
          <SideBar activeSidebar={props.activeSidebar} />
        </div>
        <div className="wrapper-right">
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
