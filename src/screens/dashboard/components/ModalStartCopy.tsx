import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import useError from 'containers/hooks/useErrorContext';
import useToastContext from 'containers/hooks/useToastContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getErrMessage } from 'utils/utilities';
import { createTradingCopyAction, getUserAmountAction } from '../ducks/actions';
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
  useEffect(() => {
    if (!isOpen) clearModal();
  }, [isOpen]);
  const { addToast } = useToastContext();
  const urlImg = useContext(UrlImagesContext);
  const handleCreateTradingCopy = () => {
    setIsNotHaveAmount(false);
    const body = {
      id_expert: detail.expert._id,
      investment_amount: parseFloat(data.investment_amount) * 100,
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
            return;
          }
          addError(err, message ? message : null);
        } else {
          dispatch(getUserAmountAction({ source: 'COPY_TRADE' }, () => {}));
          addToast('Copy traded successfully!');
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
    let result = true;
    if (!data.investment_amount || parseFloat(data.investment_amount) < 5) {
      result = false;
    }
    return result;
    if (haveMaximum) {
      if (!data.maximum_rate || parseFloat(data.maximum_rate) > 50) {
        setMaxRate(true);
        result = false;
      } else {
        setMaxRate(false);
      }
    } else {
      setMaxRate(false);
    }
    if (haveStopLoss) {
      if (!data.stop_loss || parseFloat(data.stop_loss) < 10 || parseFloat(data.stop_loss) > 100) {
        setStopLoss(true);
        result = false;
      } else {
        setStopLoss(false);
      }
    } else {
      setStopLoss(false);
    }
    if (haveTakeProfit) {
      if (!data.taken_profit || parseFloat(data.taken_profit) < 150) {
        setTakeProfit(true);
        result = false;
      } else {
        setTakeProfit(false);
      }
    } else {
      setTakeProfit(false);
    }
    return result;
  }, [data, haveMaximum, haveStopLoss, haveTakeProfit]);

  const handleTypeChange = async (value, type) => {
    switch (type) {
      case 'haveMaximum':
        setData((oldState) => ({ ...oldState, maximum_rate: '' }));
        setHaveHaximum(!value);
        break;
      case 'haveStopLoss':
        setData((oldState) => ({ ...oldState, stop_loss: '' }));
        setHaveStopLoss(!value);
        break;
      case 'haveTakeProfit':
        setData((oldState) => ({ ...oldState, taken_profit: '' }));
        setHaveTakeProfit(!value);
        break;
      default:
        break;
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
                ) : detail.expert?.username ? (
                  <p>{detail.expert.username.split('')[0]}</p>
                ) : null}
              </div>
            </div>
            <div className="name-wrapper">
              <p className="name">{detail.expert?.username}</p>
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
                  <p className="currency">00 USD</p>
                  <NumberFormat
                    thousandSeparator={true}
                    onValueChange={(values) => handleInputChange('investment_amount', values.floatValue)}
                    // onBlur={(event) => validateHandle('maximum_rate', event.target.value)}
                    prefix={'$'}
                    placeholder="$"
                    decimalScale={2}
                    value={data.investment_amount}
                  />
                  {isNotHaveAmount && (
                    <div className="invalid-feedback block">
                      Account does not have enough money! <Link to="/copy-trading/wallet">link to Wallet</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="wallet-wrapper">
                <p className="total-wallet">
                  Total wallet: <span>500 USD</span>
                </p>
                <p className="sub">500 USD is mininum required deposit for this trader</p>
              </div>
              {/* <div className="advance-wrapper">
                <button />
                <p>Advance setting</p>
              </div> */}
            </Col>
            {/* <Col md={true} className="wrapper-right">
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
                  <NumberFormat
                    disabled={!haveMaximum}
                    onValueChange={(values) => handleInputChange('maximum_rate', values.floatValue)}
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
                  <NumberFormat
                    disabled={!haveStopLoss}
                    onValueChange={(values) => handleInputChange('stop_loss', values.floatValue)}
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
                  <NumberFormat
                    disabled={!haveTakeProfit}
                    onValueChange={(values) => handleInputChange('taken_profit', values.floatValue)}
                    placeholder="%"
                    suffix={'%'}
                    value={data.taken_profit}
                  />
                  {isTakeProfit && <div className="invalid-feedback block">Take profit is more than 150%</div>}
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="button-wrapper">
          <button disabled={!validData || loading} onClick={() => handleCreateTradingCopy()}>
            Start Copy
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStartCopy;
