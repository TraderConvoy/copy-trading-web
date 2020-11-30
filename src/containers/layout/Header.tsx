// import { DocumentWidthContext } from 'containers/contexts/DocumentWidthContext';
import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  // const documentWidth = useContext(DocumentWidthContext);

  return (
    <div id="header">
      <div className="header-wrapper">
        {/* {documentWidth > 991 ? null : <div className="header-mobile">Header-Mobile</div>} */}
        <div className="header-desktop">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Header;
