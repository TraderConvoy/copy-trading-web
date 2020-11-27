import Pagination, { itemWithPage } from 'containers/components/Pagination';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useState } from 'react';
import Leader from './components/Leader';
import ModalStartCopy from './components/ModalStartCopy';

const Dashboard = () => {
  const [showModalSC, setShowModalStartSC] = useState(false);
  const [page, setPage] = useState(1);
  const urlImg = useContext(UrlImagesContext);

  const openModalSC = () => {
    setShowModalStartSC(true);
  };

  const closeModalSC = () => {
    setShowModalStartSC(false);
  };

  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  const data = Array(60)
    .fill('')
    .map((_, i) => i + 1);

  return (
    <div className="dashboard">
      <ModalStartCopy isOpen={showModalSC} closeModal={closeModalSC} />
      <div className="dashboard__header">
        <div className="title-wrapper">
          <p className="title">Top performing</p>
        </div>
        <div className="search-wrapper">
          <div className="search">
            <img src={`${urlImg}/icons/search.svg`} alt="search" />
            <input placeholder="Search leader" />
          </div>
        </div>
      </div>
      <div className="dashboard__content">
        {itemWithPage(page, 9, data).map((item) => {
          return <Leader key={item} startCopy={() => openModalSC()} />;
        })}
      </div>
      <Pagination pageChange={handlePageChange} page={page} perPage={9} data={data} />
    </div>
  );
};

export default React.memo(Dashboard);
