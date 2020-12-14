import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import useError from 'containers/hooks/useErrorContext';
import useToastContext from 'containers/hooks/useToastContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { getAmountAction, getWalletAmountAction, transferHistoryAction } from 'screens/wallet/redux/actions';
const ModalTransfer = ({ isOpen, closeModal }) => {
  const [transferValue, setTransferValue] = useState('');
  const { addError } = useError();
  const { addToast } = useToastContext();
  const urlImg = useContext(UrlImagesContext);
  const dispatch = useDispatch();
  const [availableAmount, setAvailableAmount] = useState(0);
  const [tradingAmount, setTradingAmount] = useState(0);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetAmount();
    handleGetWalletAmount();
  }, []);

  const handleGetAmount = () => {
    try {
      setIsLoading(true);
      dispatch(
        getAmountAction({ source: 'COPY_TRADE' }, (res) => {
          if (res) {
            setAvailableAmount(parseFloat(res.data));
          } else {
            setAvailableAmount(0);
          }
          setIsLoading(false);
        }),
      );
    } catch (error) {
      setIsLoading(false);
      addError(error, null);
    }
  };
  const handleGetWalletAmount = () => {
    try {
      setIsLoading(true);
      dispatch(
        getWalletAmountAction({ source: 'WALLET' }, (res) => {
          if (res) {
            setTradingAmount(parseFloat(res.data));
          } else {
            setTradingAmount(0);
          }
          setIsLoading(false);
        }),
      );
    } catch (error) {
      setIsLoading(false);
      addError(error, null);
    }
  };

  const handleTransfer = () => {
    // (WALLET/COPY_TRADE)
    const body = {
      source: 'WALLET',
      amount: transferValue,
    };
    try {
      setIsLoading(true);
      dispatch(
        transferHistoryAction(body, (err) => {
          if (err) {
            addError(err, null);
          } else {
            handleGetAmount();
            handleGetWalletAmount();
            addToast('Transfer success!');
            setTimeout(() => {
              closeModal();
            }, 2000);
          }
          setIsLoading(false);
        }),
      );
    } catch (error) {
      setIsLoading(false);
      addError(error, null);
    }
  };

  const handleTransferValueChange = (value) => {
    setTransferValue(value);
  };

  const validData = useMemo(() => {
    if (!transferValue || parseFloat(transferValue) < 10) return false;
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
            <br />
            <p style={{ position: 'absolute', bottom: 20 }}>
              <NumberFormat
                disabled={loading}
                thousandSeparator={true}
                displayType="text"
                decimalScale={2}
                value={tradingAmount}
              />{' '}
              USD
            </p>
          </div>
          <div className="to-wrapper">
            <p className="name">To</p>
            <p className="account">Copy trade account</p>
            <br />
            <p style={{ position: 'absolute', bottom: 20 }}>
              <NumberFormat
                disabled={loading}
                thousandSeparator={true}
                displayType="text"
                decimalScale={2}
                value={availableAmount}
              />{' '}
              USD
            </p>
          </div>
        </div>
        <img src={`${urlImg}icons/transfer-icon.svg`} className="transfer-icon" alt="transfer-icon" />
      </Modal.Body>
      <Modal.Footer>
        {/* <div className="detail-wrapper">
          <p>Amount</p>
          <div className="available-wrapper">
            <p className="available">Available :</p>
            <p className="number">1000 USD</p>
          </div>
        </div> */}
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
            <button disabled={!validData || loading} onClick={() => handleTransfer()}>
              Transfer
              {loading && <Spinner className="ml-1" animation="border" size="sm" variant="light" />}
            </button>
          </div>
          <p className="alert-detail">500 USD is minimum required deposit to start copy trade</p>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTransfer;
