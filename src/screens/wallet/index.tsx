import Loading from 'containers/components/Loading';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableTransferHistory from './components/TableTransferHistory';
import Transfer from './components/Transfer';
import { getTransferHistoryAction } from './redux/actions';

const fakeItem = {
  time: '18/11/2020 - 18:20:39',
  amount: '95 USD',
  from: 'Real Account',
  to: 'Copy trade account',
  status: 'Success',
};

const Wallet = () => {
  const [transferHistoryLoading, setTransferHistoryLoading] = useState(true);
  const [dataHistory, setDataHistory] = useState([]);
  const urlImg = useContext(UrlImagesContext);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const walletHistory = useSelector((state: any) => state.screen.wallet.walletHistory.data);
  console.log('walletHistory', walletHistory);

  useEffect(() => {
    handleGetTransferHistory();
  }, [page]);

  const handleGetTransferHistory = () => {
    // setTimeout(() => setTransferHistoryLoading(false), [3000]);
    try {
      dispatch(
        getTransferHistoryAction({ page: page, size: 50 }, () => {
          setTransferHistoryLoading(false);
        }),
      );
    } catch (error) {}
  };

  const fakeData = Array(70).fill(fakeItem);

  return (
    <div className="wallet">
      <div className="title-wrapper">
        <p className="title">Wallet</p>
        <p className="sub">To start copy trade you need transfer money from Real account to Copy trade account</p>
      </div>
      <Row>
        <Col md={true}>
          <Transfer handleGetTransferHistory={handleGetTransferHistory} />
        </Col>
        <Col md={true} className="d-md-none d-lg-block">
          <div className="image-wrapper d-md-none d-lg-block">
            <img src={`${urlImg}icons/wallet-icons.svg`} />
          </div>
        </Col>
      </Row>
      <p className="section-name">Tranfer History</p>
      <Loading isLoading={transferHistoryLoading}>
        <TableTransferHistory walletHistory={walletHistory} setPage={setPage} page={page} />
      </Loading>
    </div>
  );
};

export default React.memo(Wallet);
