import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import useError from 'containers/hooks/useErrorContext';
import useToastContext from 'containers/hooks/useToastContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { getUserInforAction } from 'screens/dashboard/ducks/actions';
import { getAmountAction, getWalletAmountAction, transferHistoryAction } from '../redux/actions';
const Transfer = ({ handleGetTransferHistory }) => {
  const dispatch = useDispatch();
  const { addError } = useError();
  const { addToast } = useToastContext();
  const [transferValue, setTransferValue] = useState('');
  const urlImg = useContext(UrlImagesContext);
  const [isSwitchReal, setIsSwitchReal] = useState(true);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [tradingAmount, setTradingAmount] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const handleTransferValueChange = (value) => {
    setTransferValue(value);
  };
  useEffect(() => {
    handleGetAmount();
    handleGetWalletAmount();
  }, [isSwitchReal]);

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

  const validData = useMemo(() => {
    if (!transferValue || parseFloat(transferValue) < 10) return false;
    return true;
  }, [transferValue]);

  const handleTransfer = () => {
    // (WALLET/COPY_TRADE)
    const body = {
      source: isSwitchReal ? 'WALLET' : 'COPY_TRADE',
      amount: transferValue,
    };
    try {
      setIsLoading(true);
      dispatch(
        transferHistoryAction(body, (err) => {
          if (err) {
            addError(err, null);
          } else {
            dispatch(getUserInforAction());
            handleGetAmount();
            handleGetWalletAmount();
            handleGetTransferHistory();
            addToast('Transfer success!');
          }
          setIsLoading(false);
        }),
      );
    } catch (error) {
      setIsLoading(false);
      addError(error, null);
    }
  };

  return (
    <div className="transfer">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-name">
            <p className="title">Transfer</p>
            <p className="sub">10 USD is minimum required deposit to start copy trade</p>
          </div>
        </div>
        <div className="modal-body">
          <div className="content-wrapper">
            <div className="from-wrapper">
              <p className="name">From</p>
              {isSwitchReal && <p className="account">Real account</p>}
              {!isSwitchReal && <p className="account">Copy trade account</p>}
              <NumberFormat
                disabled={loading}
                thousandSeparator={true}
                displayType="text"
                decimalScale={2}
                value={isSwitchReal ? tradingAmount : availableAmount}
              />{' '}
              USD
            </div>
            <div className="to-wrapper">
              <p className="name">To</p>
              {!isSwitchReal && <p className="account">Real account</p>}
              {isSwitchReal && <p className="account">Copy trade account</p>}
              <NumberFormat
                disabled={loading}
                thousandSeparator={true}
                displayType="text"
                decimalScale={2}
                value={!isSwitchReal ? tradingAmount : availableAmount}
              />{' '}
              USD
            </div>
          </div>
          <div className="icon-wrapper" style={{ cursor: 'pointer' }} onClick={() => setIsSwitchReal(!isSwitchReal)}>
            <img src={`${urlImg}icons/transfer-arrow.svg`} className="transfer-icon" alt="transfer-icon" />
          </div>
        </div>
        <div className="modal-footer">
          <div className="detail-wrapper">
            {/*<div className="available-wrapper">
              <p className="available">Available : </p>
              <p className="number">
                <NumberFormat
                  disabled={loading}
                  thousandSeparator={true}
                  displayType="text"
                  decimalScale={2}
                  value={isSwitchReal ? tradingAmount : availableAmount}
                />{' '}
                USD
              </p>
            </div>
            <div className="available-wrapper">
              <p className="available">Available : </p>
              <p className="number">
                <NumberFormat
                  disabled={loading}
                  thousandSeparator={true}
                  displayType="text"
                  decimalScale={2}
                  value={!isSwitchReal ? tradingAmount : availableAmount}
                />{' '}
                USD
              </p>
            </div>*/}
          </div>
          <div className="button-wrapper">
            <div className="input">
              <p className="currency">USD</p>
              <NumberFormat
                thousandSeparator={true}
                onValueChange={(values) => handleTransferValueChange(values.floatValue)}
                decimalScale={2}
                value={transferValue}
                prefix={'$'}
                placeholder="10 USD is minimum"
              />
            </div>
            <div className="button">
              <button disabled={!validData || loading} onClick={() => handleTransfer()}>
                <img src={`${urlImg}icons/transfer-arrow.svg`} className="transfer-icon" alt="transfer-icon" />
                Transfer
                {loading && <Spinner className="ml-1" animation="border" size="sm" variant="light" />}
              </button>
            </div>
            {/* <p className="alert-detail">500 USD is minimum required deposit to start copy trade</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
