import Pagination, { itemWithPage } from 'containers/components/Pagination';
import { DocumentWidthContext } from 'containers/contexts/DocumentWidthContext';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Leader from './components/Leader';
import ModalStartCopy from './components/ModalStartCopy';
import { getListExpertsAction } from './ducks/actions';
// import ModalTransfer from './components/ModalTransfer';
const initPage = {
  count: '',
  current: 1,
  pageSize: 20,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showModalSC, setShowModalStartSC] = useState(false);
  // const [showModalTf, setShowModalTf] = useState(false);
  const [page, setPage] = useState(1);
  const urlImg = useContext(UrlImagesContext);
  const documentWidth = useContext(DocumentWidthContext);
  const [pagination, setPagination] = useState(initPage);

  useEffect(() => {
    dispatch(
      getListExpertsAction(
        { id_user: '5fc70cadc982ed201cd6b6fa', page: pagination.current, size: pagination.pageSize },
        () => {},
      ),
    );
  }, []);

  const openModalSC = () => {
    setShowModalStartSC(true);
  };

  const closeModalSC = () => {
    setShowModalStartSC(false);
  };

  // const closeModalTf = () => {
  //   setShowModalTf(false);
  // };

  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  const data = Array(60)
    .fill('')
    .map((_, i) => i + 1);

  return (
    <div className="dashboard">
      <ModalStartCopy isOpen={showModalSC} closeModal={closeModalSC} />
      {/* <ModalTransfer isOpen={showModalTf} closeModal={closeModalTf} /> */}
      <div className="dashboard__header">
        <Row>
          <Col md={true}>
            <div className="title-wrapper">
              <p className="title">Top performing</p>
            </div>
          </Col>
          <Col md={true}>
            <div className="search-wrapper">
              <div className="search">
                <img src={`${urlImg}/icons/search.svg`} alt="search" />
                <input placeholder="Search leader" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="dashboard__content">
        <Row>
          {itemWithPage(page, 9, data).map((item) => {
            return (
              <Col sm={true} md={true} lg={6} xl={documentWidth < 1360 ? 6 : 4} key={item}>
                <Leader startCopy={() => openModalSC()} />
              </Col>
            );
          })}
        </Row>
      </div>
      <Pagination pageChange={handlePageChange} page={page} perPage={9} data={data} />
    </div>
  );
};

export default React.memo(Dashboard);
