import Toggle from 'containers/components/Toggle';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';

const ModalStartCopy = ({ isOpen, closeModal }) => {
  const [haveMaximum, setHaveHaximum] = useState(false);
  const [haveStopLoss, setHaveStopLoss] = useState(false);
  const [haveTakeProfit, setHaveTakeProfit] = useState(false);

  const urlImg = useContext(UrlImagesContext);

  return (
    <Modal show={isOpen} onHide={() => closeModal()} className="start-copy-modal" size="lg">
      <Modal.Header>
        <div className="wrapper-left">
          <div className="info-wrapper">
            <div className="avatar-wrapper">
              <div className="avatar" />
            </div>
            <div className="name-wrapper">
              <p className="name">ACGInvest</p>
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
                  <input />
                </div>
              </div>
              <div className="wallet-wrapper">
                <p className="total-wallet">
                  Total wallet: <span>500USD</span>
                </p>
                <p className="sub">500USD is mininum required deposit for this trader</p>
              </div>
              <div className="advance-wrapper">
                <button />
                <p>Advance setting</p>
              </div>
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
                  <input />
                </div>
              </div>
              <div className="input-wrapper stop-loss">
                <div className="__header">
                  <p>Stop loss</p>
                  <Toggle active={haveStopLoss} onClick={(value: boolean) => setHaveStopLoss(value)} />
                </div>
                <div className="__input">
                  <input />
                </div>
              </div>
              <div className="input-wrapper take-profit">
                <div className="__header">
                  <p>Take profit</p>
                  <Toggle active={haveTakeProfit} onClick={(value: boolean) => setHaveTakeProfit(value)} />
                </div>
                <div className="__input">
                  <input />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="button-wrapper">
          <button>Start Copy</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStartCopy;
