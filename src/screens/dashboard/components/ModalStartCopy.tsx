import Toggle from 'containers/components/Toggle';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import useError from 'containers/hooks/useErrorContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createTradingCopyAction } from '../ducks/actions';

const initializeData = {
  investment_amount: '',
  maximum_rate: '',
  stop_loss: '',
  taken_profit: '',
};

const ModalStartCopy = ({ isOpen, closeModal, detail, userId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.common.loading);
  const { addError } = useError();
  const [haveMaximum, setHaveHaximum] = useState(false);
  const [haveStopLoss, setHaveStopLoss] = useState(false);
  const [haveTakeProfit, setHaveTakeProfit] = useState(false);
  const [data, setData] = useState({ ...initializeData });

  useEffect(() => {
    if (!isOpen) clearModal();
  }, [isOpen]);

  const urlImg = useContext(UrlImagesContext);

  const handleCreateTradingCopy = () => {
    const body = {
      id_user: userId,
      id_expert: detail._id,
      investment_amount: data.investment_amount,
      maximum_rate: data.maximum_rate,
      has_maximum_rate: haveMaximum,
      stop_loss: data.stop_loss,
      has_stop_loss: haveStopLoss,
      taken_profit: data.taken_profit,
      has_taken_profit: haveTakeProfit,
    };
    dispatch(
      createTradingCopyAction(body, (err, res: any) => {
        if (err) addError(err, null);
        else clearModal();
      }),
    );
  };

  const handleInputChange = (name, value) => {
    setData((oldState) => ({ ...oldState, [name]: value }));
  };

  const clearModal = () => {
    setHaveHaximum(false);
    setHaveStopLoss(false);
    setHaveTakeProfit(false);
    setData({ ...initializeData });
  };

  const validData: boolean = useMemo(() => {
    if (!data.investment_amount || parseFloat(data.investment_amount) < 500) return false;
    if (!data.maximum_rate || parseFloat(data.maximum_rate) < 1) return false;
    if (!data.stop_loss || parseFloat(data.stop_loss) < 1) return false;
    if (!data.taken_profit || parseFloat(data.taken_profit) < 1) return false;
    return true;
  }, [data, haveMaximum, haveStopLoss, haveTakeProfit]);

  return (
    <Modal show={isOpen} onHide={() => closeModal()} className="start-copy-modal" size="lg">
      <Modal.Header>
        <div className="wrapper-left">
          <div className="info-wrapper">
            <div className="avatar-wrapper">
              <div className="avatar">
                {detail.avatar ? (
                  <img src={detail.avatar} alt="avatar" />
                ) : detail.fullname ? (
                  <p>{detail.fullname.split('')[0]}</p>
                ) : null}
              </div>
            </div>
            <div className="name-wrapper">
              <p className="name">{detail.fullname}</p>
              <p className="sub">
                <span className="expert">Expert</span>
                <span className="percent">5%</span>
                Profit sharing
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper-right">
          <div className="close-wrapper">
            <button onClick={() => closeModal()}>
              <img src={`${urlImg}icons/close.svg`} alt="close" />
            </button>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Container fluid={true}>
          <Row>
            <Col md={true} className="wrapper-left">
              <p className="title">Start Copy Now</p>
              <div className="amount-wrapper">
                <p>Amount of investment</p>
                <div className="input-wrapper">
                  <p className="currency">USD</p>
                  <input
                    value={data.investment_amount}
                    onChange={(event) => handleInputChange('investment_amount', event.target.value)}
                  />
                </div>
              </div>
              <div className="wallet-wrapper">
                <p className="total-wallet">
                  Total wallet: <span>500USD</span>
                </p>
                <p className="sub">500USD is mininum required deposit for this trader</p>
              </div>
              {/* <div className="advance-wrapper">
                <button />
                <p>Advance setting</p>
              </div> */}
            </Col>
            <Col md={true} className="wrapper-right">
              <div className="advance-wrapper">
                <p>Advance setting</p>
                <p>1 USD is mininum required to start copy</p>
              </div>
              <div className="input-wrapper maxinum">
                <div className="__header">
                  <p>Maximum</p>
                  <Toggle active={haveMaximum} onClick={(value: boolean) => setHaveHaximum(value)} />
                </div>
                <div className="__input">
                  <input
                    // disabled={!haveMaximum}
                    type="number"
                    max="50"
                    value={data.maximum_rate}
                    onChange={(event) => handleInputChange('maximum_rate', event.target.value)}
                  />
                </div>
              </div>
              <div className="input-wrapper stop-loss">
                <div className="__header">
                  <p>Stop loss</p>
                  <Toggle active={haveStopLoss} onClick={(value: boolean) => setHaveStopLoss(value)} />
                </div>
                <div className="__input">
                  <input
                    // disabled={!haveStopLoss}
                    min="10"
                    value={data.stop_loss}
                    type="number"
                    onChange={(event) => handleInputChange('stop_loss', event.target.value)}
                  />
                </div>
              </div>
              <div className="input-wrapper take-profit">
                <div className="__header">
                  <p>Take profit</p>
                  <Toggle active={haveTakeProfit} onClick={(value: boolean) => setHaveTakeProfit(value)} />
                </div>
                <div className="__input">
                  <input
                    // disabled={!haveTakeProfit}
                    min="150"
                    value={data.taken_profit}
                    type="number"
                    onChange={(event) => handleInputChange('taken_profit', event.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="button-wrapper" onClick={() => handleCreateTradingCopy()}>
          <button disabled={!validData || loading}>Start Copy</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStartCopy;
