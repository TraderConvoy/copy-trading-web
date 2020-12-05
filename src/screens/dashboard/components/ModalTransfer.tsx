import system from 'constant/localstore';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { transferAmountAction } from '../ducks/actions';
const ModalTransfer = ({ isOpen, closeModal }) => {
  const [transferValue, setTransferValue] = useState('');
  const urlImg = useContext(UrlImagesContext);
  const dispatch = useDispatch();
  const handleTransfer = () => {
    //TODO: update service khi có api | should check  both server client update more than 1000
    let body = {
      access_token: localStorage.getItem(system.TOKEN),
      amount: transferValue,
    };
    alert(JSON.stringify(body));
    return;
    dispatch(transferAmountAction(body, (res) => {}));
  };

  const handleTransferValueChange = (value) => {
    setTransferValue(value);
  };

  const validData = useMemo(() => {
    if (!transferValue || parseFloat(transferValue) < 1000) return false;
    return true;
  }, [transferValue]);

  return (
    <Modal show={isOpen} onHide={() => closeModal()} className="transfer-modal" size="lg">
      <Modal.Header>
        <div className="modal-name">
          <p>Transfer</p>
        </div>
        <div className="close-wrapper">
          <button onClick={() => closeModal()}>
            <img src={`${urlImg}icons/close.svg`} alt="close" />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="content-wrapper">
          <div className="from-wrapper">
            <p className="name">From</p>
            <p className="account">Real account</p>
          </div>
          <div className="to-wrapper">
            <p className="name">To</p>
            <p className="account">Copy trade account</p>
          </div>
        </div>
        <img src={`${urlImg}icons/transfer-icon.svg`} className="transfer-icon" alt="transfer-icon" />
      </Modal.Body>
      <Modal.Footer>
        <div className="detail-wrapper">
          <p>Amount</p>
          <div className="available-wrapper">
            <p className="available">Available :</p>
            <p className="number">1000 USD</p>
          </div>
        </div>
        <div className="button-wrapper">
          <div className="input">
            <p className="currency">USD</p>
            {/* <input value={transferValue} onChange={(event) => handleTransferValueChange(event)} /> */}
            <NumberFormat
              thousandSeparator={true}
              onValueChange={(values) => handleTransferValueChange(values.floatValue)}
              prefix={'$'}
              placeholder="$"
              decimalScale={2}
              value={transferValue}
            />
          </div>
          <div className="button">
            <button disabled={!validData} onClick={() => handleTransfer()}>
              Transfer
            </button>
          </div>
          <p className="alert-detail">500 USD is minimum required deposit to start copy trade</p>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTransfer;
