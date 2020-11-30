import { ButtonPause, ButtonStart, ButtonStop } from 'containers/components/Buttons';
import { DocumentWidthContext } from 'containers/contexts/DocumentWidthContext';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

const InvestmentHistoryItem = ({ running = false }) => {
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
                <p className="name">ManhDung225</p>
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
              <p className="value">500 USD</p>
            </div>
            <div className="detail-item">
              <p className="name">Current balance</p>
              <p className="value">540 USD</p>
            </div>
          </div>
        </Col>
        <Col md={true} lg={documentWidth < 1465 ? 12 : 3}>
          <div className="button-wrapper">
            <div className="button-wrapper__button">
              <ButtonStop />
              {running ? <ButtonPause /> : <ButtonStart />}
            </div>
            <div className="button-wrapper__sub">
              <p>Start time: 10/11/2020 - 08:02:02</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentHistoryItem;
