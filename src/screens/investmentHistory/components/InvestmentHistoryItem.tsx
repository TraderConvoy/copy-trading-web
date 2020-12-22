import { ButtonStop } from 'containers/components/Buttons';
import { DocumentWidthContext } from 'containers/contexts/DocumentWidthContext';
import moment from 'moment/moment';
import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { formatter } from 'utils/utilities';
const InvestmentHistoryItem = ({ item, handleStop, handlePause, handleStart }) => {
  const loading = useSelector((state: any) => state.common.loading);
  const documentWidth = useContext(DocumentWidthContext);

  const formatItemExpert = useMemo(() => {
    if (item.expert[0]) {
      return {
        avatar: item.expert[0]?.avatar,
        fullname: item.expert[0]?.username ? item.expert[0]?.username : 'RD',
      };
    }
    return {};
  }, [item]);

  return (
    <div className="investment-history-item">
      <Row>
        <Col md={true} lg={documentWidth < 1143 ? 12 : 3}>
          <div className="info-wrapper">
            <div className="wrapper-left">
              <div className="avatar">
                {formatItemExpert.avatar ? (
                  <img src={formatItemExpert.avatar} alt="avatar" />
                ) : (
                  <p>{item.expert[0]?.username.split('')[0]}</p>
                )}
              </div>
            </div>
            <div className="wrapper-right">
              <div className="name-wrapper">
                <p className="name">{item.expert[0]?.username}</p>
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
              <p className="name">Percentage gain</p>
              <p className={`value ${item.investment_amount - item.base_amount < 0 && 'invest-loss'}`}>
                {formatter.format(((item.investment_amount - item.base_amount) * 100) / item.base_amount)} %
              </p>
            </div>
            <div className="detail-item">
              <p className="name">Amount of investment</p>
              <p className="value">{formatter.format(item.base_amount)} USD</p>
            </div>
            <div className="detail-item">
              <p className="name">Profit</p>
              <p className={`value ${item.investment_amount - item.base_amount < 0 && 'invest-loss'}`}>
                {formatter.format(item.investment_amount - item.base_amount)} USD
              </p>
            </div>
          </div>
        </Col>
        <Col md={true} lg={documentWidth < 1465 ? 12 : 3}>
          <div className="button-wrapper">
            <div className="button-wrapper__button">
              <ButtonStop disabled={loading} onClick={() => handleStop(item._id)} />
              {/* {item.status === 'ACTIVE' ? (
                <ButtonPause disabled={loading} onClick={() => handlePause(item._id)} />
              ) : (
                <ButtonStart disabled={loading} onClick={() => handleStart(item._id)} />
              )} */}
            </div>
            <div className="button-wrapper__sub">
              <p>{moment.utc(item.createdAt).local().format('MM/DD/YYYY - HH:mm:ss')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentHistoryItem;
