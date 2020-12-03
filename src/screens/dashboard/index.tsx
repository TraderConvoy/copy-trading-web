import Loading from 'containers/components/Loading';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import { DocumentWidthContext } from 'containers/contexts/DocumentWidthContext';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import useError from 'containers/hooks/useErrorContext';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Leader from './components/Leader';
import ModalStartCopy from './components/ModalStartCopy';
import { getListExpertsAction } from './ducks/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { addError } = useError();
  const [data, setData] = useState([]);
  const [expertSelector, setExpertSelector] = useState({});
  const [showModalSC, setShowModalStartSC] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);

  const loading = useSelector((state: any) => state.common.loading);
  // const [showModalTf, setShowModalTf] = useState(false);
  const urlImg = useContext(UrlImagesContext);
  const documentWidth = useContext(DocumentWidthContext);
  // FIXME:
  const userId = '5fc70cadc982ed201cd6b6fb';

  useEffect(() => {
    handleGetListExpert();
  }, []);

  const handleGetListExpert = () => {
    setPageLoading(true);
    dispatch(
      getListExpertsAction((err, res: any) => {
        if (err) addError(err, null);
        else setData(res.data);
        setPageLoading(false);
      }),
    );
  };

  const handleStartCopy = (detail: any): void => {
    setExpertSelector(detail);
    openModalSC();
  };

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

  return (
    <div className="dashboard">
      <ModalStartCopy detail={expertSelector} userId={userId} isOpen={showModalSC} closeModal={closeModalSC} />
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
      <Loading isLoading={pageLoading}>
        <div className="dashboard__content">
          <Row>
            {itemWithPage(page, 9, data).map((item) => {
              return (
                <Col sm={true} md={true} lg={6} xl={documentWidth < 1360 ? 6 : 4} key={item._id}>
                  <Leader detail={item} startCopy={handleStartCopy} />
                </Col>
              );
            })}
          </Row>
        </div>
        <Pagination pageChange={handlePageChange} page={page} perPage={9} count={data.length} />
      </Loading>
    </div>
  );
};

export default React.memo(Dashboard);
