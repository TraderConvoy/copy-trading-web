import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalStartCopy = () => {
  return (
    <Modal show={true} onHide={() => {}} className="start-copy-modal" size="lg">
      <Modal.Header>
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
      </Modal.Header>
      <Modal.Body>
        <div className="wrapper-left">
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
        </div>
        <div className="wrapper-right">
          <div className="advance-wrapper">
            <p>Advance setting</p>
            <p>1 USD is mininum required to start copy</p>
          </div>
          <div className="input-wrapper maxinum">
            <div className="__header">
              <p>Maximum</p>
            </div>
            <div className="__input">
              <input />
            </div>
          </div>
          <div className="input-wrapper stop-lost">
            <div className="__header">
              <p>Maximum</p>
            </div>
            <div className="__input">
              <input />
            </div>
          </div>
          <div className="input-wrapper take-profit">
            <div className="__header">
              <p>Maximum</p>
            </div>
            <div className="__input">
              <input />
            </div>
          </div>
        </div>
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
