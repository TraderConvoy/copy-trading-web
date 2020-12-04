import { ButtonPause, ButtonStart, ButtonStop } from 'containers/components/Buttons';
import { DocumentWidthContext } from 'containers/contexts/DocumentWidthContext';
import moment from 'moment/moment';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const InvestmentHistoryItem = ({ item, handleStop, handlePause, handleStart }) => {
  const loading = useSelector((state: any) => state.common.loading);
  const documentWidth = useContext(DocumentWidthContext);

  return (
    <div className="investment-history-item">
      <Row>
        <Col md={true} lg={documentWidth < 1143 ? 12 : 3}>
          <div className="info-wrapper">
            <div className="wrapper-left">
              <div className="avatar" />
            </div>
            <div className="wrapper-right">
              <div className="name-wrapper">
                <p className="name">{item.expert_name}</p>
                <p className="sub">
                  <span className="expert">Expert</span>
                  <span className="percent">5%</span>
                  Profit sharing
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={true} lg={documentWidth < 1465 ? 9 : 6}>
          <div className="detail-wrapper">
            <div className="detail-item">
              <p className="name">Gain last time</p>
              <p className="value">+8%</p>
            </div>
            <div className="detail-item">
              <p className="name">Amount of investment</p>
              <p className="value">{item.base_amount} USD</p>
            </div>
            <div className="detail-item">
              <p className="name">Current balance</p>
              <p className="value">{item.investment_amount} USD</p>
            </div>
          </div>
        </Col>
        <Col md={true} lg={documentWidth < 1465 ? 12 : 3}>
          <div className="button-wrapper">
            <div className="button-wrapper__button">
              <ButtonStop disabled={loading} onClick={() => handleStop(item._id)} />
              {item.status === 'ACTIVE' ? (
                <ButtonPause disabled={loading} onClick={() => handlePause(item._id)} />
              ) : (
                <ButtonStart disabled={loading} onClick={() => handleStart(item._id)} />
              )}
            </div>
            <div className="button-wrapper__sub">
              <p>{moment(item.createdAt).format('MM/DD/YYYY - hh:mm')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentHistoryItem;
