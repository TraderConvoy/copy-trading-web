import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { transferAmountAction } from 'screens/dashboard/ducks/actions';

const Transfer = () => {
  const dispatch = useDispatch();
  const [transferValue, setTransferValue] = useState('');
  const urlImg = useContext(UrlImagesContext);

  const handleTransferValueChange = (value) => {
    setTransferValue(value);
  };

  const validData = useMemo(() => {
    if (!transferValue || parseFloat(transferValue) < 1000) return false;
    return true;
  }, [transferValue]);

  const handleTransfer = () => {
    //TODO: update service khi có api | should check  both server client update more than 1000
    const body = {
      // access_token: localStorage.getItem(system.TOKEN),
      amount: transferValue,
    };
    alert(JSON.stringify(body));
    return;
    dispatch(transferAmountAction(body, (res) => {}));
  };

  return (
    <div className="transfer">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-name">
            <p className="title">Transfer</p>
            <p className="sub">500 USD is minimum required deposit to start copy trade</p>
          </div>
        </div>
        <div className="modal-body">
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
          <div className="icon-wrapper">
            <img src={`${urlImg}icons/transfer-arrow.svg`} className="transfer-icon" alt="transfer-icon" />
          </div>
        </div>
        <div className="modal-footer">
          <div className="detail-wrapper">
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
                decimalScale={2}
                value={transferValue}
              />
            </div>
            <div className="button">
              <button disabled={!validData} onClick={() => handleTransfer()}>
                <img src={`${urlImg}icons/transfer-arrow.svg`} className="transfer-icon" alt="transfer-icon" />
                Transfer
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
