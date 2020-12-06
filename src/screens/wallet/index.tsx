import Loading from 'containers/components/Loading';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import TableTransferHistory from './components/TableTransferHistory';
import Transfer from './components/Transfer';

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

  useEffect(() => {
    handleGetTransferHistory();
  }, []);

  const handleGetTransferHistory = () => {
    setTransferHistoryLoading(true);
    setTimeout(() => setTransferHistoryLoading(false), [3000]);
    // const body = {};
    // dispatch(getTransferHistoryAction(body, () => {}))
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
          <Transfer />
        </Col>
        <Col md={true} className="d-md-none d-lg-block">
          <div className="image-wrapper d-md-none d-lg-block">
            <img src={`${urlImg}icons/wallet-icons.svg`} />
          </div>
        </Col>
      </Row>
      <p className="section-name">Tranfer History</p>
      <Loading isLoading={transferHistoryLoading}>
        <TableTransferHistory data={fakeData} />
      </Loading>
    </div>
  );
};

export default React.memo(Wallet);
