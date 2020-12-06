import Toggle from 'containers/components/Toggle';
import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import useError from 'containers/hooks/useErrorContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { getErrMessage } from 'utils/utilities';
import { createTradingCopyAction } from '../ducks/actions';

const initializeData = {
  investment_amount: '',
  maximum_rate: '',
  stop_loss: '',
  taken_profit: '',
};

const ModalStartCopy = ({ isOpen, closeModal, detail, setShowModalTf }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.common.loading);
  const { addError } = useError();
  const [haveMaximum, setHaveHaximum] = useState(false);
  const [haveStopLoss, setHaveStopLoss] = useState(false);
  const [haveTakeProfit, setHaveTakeProfit] = useState(false);
  const [data, setData] = useState({ ...initializeData });
  const [isMaxRate, setMaxRate] = useState(false);
  const [isStopLoss, setStopLoss] = useState(false);
  const [isTakeProfit, setTakeProfit] = useState(false);
  const [isNotHaveAmount, setIsNotHaveAmount] = useState(false);
  const [isVaidate, setisVaidate] = useState(false);
  useEffect(() => {
    if (!isOpen) clearModal();
  }, [isOpen]);

  const urlImg = useContext(UrlImagesContext);
  const handleCreateTradingCopy = () => {
    setIsNotHaveAmount(false);
    const body = {
      id_expert: detail.expert._id,
      investment_amount: parseFloat(data.investment_amount),
      maximum_rate: haveMaximum ? data.maximum_rate : 0,
      has_maximum_rate: haveMaximum,
      stop_loss: haveStopLoss ? data.stop_loss : 0,
      has_stop_loss: haveStopLoss,
      taken_profit: haveTakeProfit ? data.taken_profit : 0,
      has_taken_profit: haveTakeProfit,
    };
    dispatch(
      createTradingCopyAction(body, async (err, res: any) => {
        if (err) {
          const message = await getErrMessage(err, null);
          if (message.indexOf('Account does not have enough money!') !== -1) {
            setIsNotHaveAmount(true);
            clearModal();
            setTimeout(() => {
              closeModal();
              setShowModalTf(true);
            }, 300);
            return;
          }
          addError(err, message ? message : null);
        } else {
          //:FIXME: show message success rồi close modal
          closeModal();
          clearModal();
        }
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
    return true;
  }, [data, haveMaximum, haveStopLoss, haveTakeProfit]);

  const handleTypeChange = async (value, type) => {
    switch (type) {
      case 'haveMaximum':
        await setHaveHaximum(!value);
        validateHandle('maximum_rate', data.maximum_rate, value);
        break;
      case 'haveStopLoss':
        await setHaveStopLoss(!value);
        validateHandle('stop_loss', data.stop_loss, value);
        break;
      case 'haveTakeProfit':
        await setHaveTakeProfit(!value);
        validateHandle('taken_profit', data.taken_profit, value);
        break;

      default:
        break;
    }
    console.log(haveMaximum);
  };

  const validateHandle = (type, values, isReturn?) => {
    const value = parseFloat(values);
    setisVaidate(false);
    if (!data.investment_amount || parseFloat(data.investment_amount) < 500) {
      setisVaidate(true);
      return;
    }
    switch (type) {
      case 'maximum_rate':
        setMaxRate(false);
        if (isReturn) return;
        if (value > 50 || value < 1) {
          setisVaidate(true);
          setMaxRate(true);
        }
        break;
      case 'stop_loss':
        setStopLoss(false);
        if (isReturn) return;
        if (value > 100 || value < 10) {
          setisVaidate(true);
          setStopLoss(true);
        }
        break;
      case 'taken_profit':
        setTakeProfit(false);
        if (isReturn) return;
        if (value < 150) {
          setisVaidate(true);
          setTakeProfit(true);
        }
        break;
      default:
        break;
    }
    if (isMaxRate || isStopLoss || isTakeProfit) {
      setisVaidate(true);
    }
  };

  return (
    <Modal show={isOpen} onHide={() => closeModal()} className="start-copy-modal" size="lg">
      <Modal.Header>
        <div className="wrapper-left">
          <div className="info-wrapper">
            <div className="avatar-wrapper">
              <div className="avatar">
                {detail.expert?.avatar ? (
                  <img src={detail.expert.avatar} alt="avatar" />
                ) : detail.expert?.fullname ? (
                  <p>{detail.expert.fullname.split('')[0]}</p>
                ) : null}
              </div>
            </div>
            <div className="name-wrapper">
              <p className="name">{detail.expert?.fullname}</p>
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
                  <NumberFormat
                    thousandSeparator={true}
                    onValueChange={(values) => handleInputChange('investment_amount', values.floatValue)}
                    onBlur={(event) => validateHandle('maximum_rate', event.target.value)}
                    prefix={'$'}
                    placeholder="$"
                    decimalScale={2}
                    value={data.investment_amount}
                  />
                </div>
              </div>

              <div className="wallet-wrapper">
                <p className="total-wallet">
                  Total wallet: <span>500 USD</span>
                </p>
                <p className="sub">500 USD is mininum required deposit for this trader</p>
                <br />
                {isNotHaveAmount && <div className="invalid-feedback block">Account does not have enough money!</div>}
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
                  <Toggle
                    active={haveMaximum}
                    onClick={(value: boolean) => handleTypeChange(haveMaximum, 'haveMaximum')}
                  />
                </div>
                <div className="__input">
                  {/* <input
                    // disabled={!haveMaximum}
                    type="number"
                    max="50"
                    value={data.maximum_rate}
                    onChange={(event) => handleInputChange('maximum_rate', event.target.value)}
                  /> */}
                  <NumberFormat
                    disabled={!haveMaximum}
                    onValueChange={(values) => handleInputChange('maximum_rate', values.floatValue)}
                    onBlur={(event) => validateHandle('maximum_rate', event.target.value)}
                    placeholder="%"
                    suffix={'%'}
                    value={data.maximum_rate}
                  />
                  {isMaxRate && <div className="invalid-feedback block">Maximum is 50%</div>}
                </div>
              </div>
              <div className="input-wrapper stop-loss">
                <div className="__header">
                  <p>Stop loss</p>
                  <Toggle
                    active={haveStopLoss}
                    onClick={(value: boolean) => handleTypeChange(haveStopLoss, 'haveStopLoss')}
                  />
                </div>
                <div className="__input">
                  {/* <input
                    // disabled={!haveStopLoss}
                    min="10"
                    value={data.stop_loss}
                    type="number"
                    onChange={(event) => handleInputChange('stop_loss', event.target.value)}
                  /> */}
                  <NumberFormat
                    disabled={!haveStopLoss}
                    onValueChange={(values) => handleInputChange('stop_loss', values.floatValue)}
                    onBlur={(event) => validateHandle('stop_loss', event.target.value)}
                    placeholder="%"
                    suffix={'%'}
                    value={data.stop_loss}
                  />
                  {isStopLoss && (
                    <div className="invalid-feedback block">Stop loss is more than 10% and less than 100</div>
                  )}
                </div>
              </div>
              <div className="input-wrapper take-profit">
                <div className="__header">
                  <p>Take profit</p>
                  <Toggle
                    active={haveTakeProfit}
                    onClick={(value: boolean) => handleTypeChange(haveTakeProfit, 'haveTakeProfit')}
                  />
                </div>
                <div className="__input">
                  {/* <input
                    // disabled={!haveTakeProfit}
                    min="150"
                    value={data.taken_profit}
                    type="number"
                    onChange={(event) => handleInputChange('taken_profit', event.target.value)}
                  /> */}
                  <NumberFormat
                    disabled={!haveTakeProfit}
                    onValueChange={(values) => handleInputChange('taken_profit', values.floatValue)}
                    onBlur={(event) => validateHandle('taken_profit', event.target.value)}
                    placeholder="%"
                    suffix={'%'}
                    value={data.taken_profit}
                  />
                  {isTakeProfit && <div className="invalid-feedback block">Take profit is more than 150%</div>}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="button-wrapper">
          <button disabled={isVaidate || !validData || loading} onClick={() => handleCreateTradingCopy()}>
            Start Copy
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStartCopy;
