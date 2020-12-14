import system from 'constant/localstore';
import Loading from 'containers/components/Loading';
import Pagination from 'containers/components/Pagination';
import { DocumentWidthContext } from 'containers/contexts/DocumentWidthContext';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import useError from 'containers/hooks/useErrorContext';
import useToastContext from 'containers/hooks/useToastContext';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Leader from './components/Leader';
import ModalStartCopy from './components/ModalStartCopy';
import ModalTransfer from './components/ModalTransfer';
import { getListExpertsAction, getListExpertsByNameAction } from './ducks/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { addError } = useError();
  const { addToast } = useToastContext();
  const [data, setData] = useState({ result: [], count: 0 });
  const history = useHistory();
  const [expertSelector, setExpertSelector] = useState({});
  const [showModalSC, setShowModalStartSC] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [showModalTf, setShowModalTf] = useState(false);
  const urlImg = useContext(UrlImagesContext);
  const documentWidth = useContext(DocumentWidthContext);
  const [keySearch, setkeySearch] = useState('');
  const [isSearch, setisSearch] = useState(false);
  useEffect(() => {
    handleGetListExpert(page);
  }, []);

  const handleGetListExpert = (page) => {
    setPageLoading(true);
    if (keySearch && isSearch) {
      handleSearchBar();
    } else {
      dispatch(
        getListExpertsAction({ page, size: 9 }, (err, res: any) => {
          if (err) addError(err, null);
          else {
            console.log(res);
            setData(res.data);
          }
          setPageLoading(false);
        }),
      );
    }
  };

  const handleStartCopy = (detail: any): void => {
    if (!localStorage.getItem(system.TOKEN)) {
      history.push('/copy-trading/login');
    }
    setExpertSelector(detail);
    openModalSC();
  };

  const openModalSC = () => {
    setShowModalStartSC(true);
  };

  const closeModalSC = () => {
    setShowModalStartSC(false);
  };

  const closeModalTf = () => {
    setShowModalTf(false);
  };

  const handlePageChange = (page: number): void => {
    setPage(page);
    handleGetListExpert(page);
  };

  const _handleKeyDown = (e) => {
    console.log(e.target.value);
    if (e.key === 'Enter') {
      handleSearchBar();
    }
  };

  const handleSearchBar = () => {
    setisSearch(true);
    setPageLoading(true);
    if (keySearch === '') {
      handlePageChange(1);
    }
    dispatch(
      getListExpertsByNameAction({ username: keySearch, page: 1, size: 9 }, (err, res: any) => {
        if (err) addError(err, null);
        else {
          if (res.data && res.data.length === 0) {
            addToast('Leder not found!');
          }
          setData(res.data);
        }
        setPageLoading(false);
      }),
    );
  };

  const handleChange = (e) => {
    setkeySearch(e.target.value);
  };

  return (
    <div className="dashboard">
      {showModalSC && (
        <ModalStartCopy
          detail={expertSelector}
          isOpen={showModalSC}
          closeModal={closeModalSC}
          setShowModalTf={setShowModalTf}
        />
      )}
      {showModalTf && <ModalTransfer isOpen={showModalTf} closeModal={closeModalTf} />}

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
                <img
                  src={`${urlImg}/icons/search.svg`}
                  alt="search"
                  onClick={handleSearchBar}
                  style={{ cursor: 'pointer' }}
                />
                <input placeholder="Search leader" onChange={handleChange} onKeyDown={_handleKeyDown} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Loading isLoading={pageLoading}>
        <div className="dashboard__content">
          <Row>
            {data?.result &&
              data?.result.map((item: any) => {
                return (
                  <Col
                    className="mb-20"
                    sm={true}
                    md={true}
                    lg={6}
                    xl={documentWidth < 1360 ? 6 : 4}
                    key={item.expert._id}
                  >
                    <Leader detail={item} startCopy={handleStartCopy} />
                  </Col>
                );
              })}
          </Row>
        </div>
        {data?.result && (
          <Pagination
            pageChange={(page: number) => handlePageChange(page)}
            page={page}
            perPage={9}
            count={data.count}
          />
        )}
      </Loading>
    </div>
  );
};

export default React.memo(Dashboard);
