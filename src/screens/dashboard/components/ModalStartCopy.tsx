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
    if (haveMaximum && parseFloat(data.maximum_rate) > 50) return false;
    if (haveStopLoss && parseFloat(data.stop_loss) < 10) return false;
    if (haveTakeProfit && parseFloat(data.taken_profit) < 150) return false;
    return true;
  }, [data, haveMaximum, haveStopLoss, haveTakeProfit]);

  const MaxRateHandle = (type, event) => {
    let value = parseInt(event.target.value);
    setMaxRate(false);
    setStopLoss(false);
    setTakeProfit(false);
    switch (type) {
      case 'maximum_rate':
        if (!haveMaximum) return;
        if (value > 50 || value < 1) {
          setMaxRate(true);
        }
        break;
      case 'stop_loss':
        if (!haveStopLoss) return;
        if (value < 10 || value > 100) {
          setStopLoss(true);
        }
        break;
      case 'taken_profit':
        if (!haveTakeProfit) return;
        if (value < 150) {
          setTakeProfit(true);
        }
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
                  <Toggle active={haveMaximum} onClick={(value: boolean) => setHaveHaximum(value)} />
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
                    onValueChange={(values) => handleInputChange('maximum_rate', values.floatValue)}
                    onBlur={(event) => MaxRateHandle('maximum_rate', event)}
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
                  <Toggle active={haveStopLoss} onClick={(value: boolean) => setHaveStopLoss(value)} />
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
                    onValueChange={(values) => handleInputChange('stop_loss', values.floatValue)}
                    onBlur={(event) => MaxRateHandle('stop_loss', event)}
                    placeholder="%"
                    suffix={'%'}
                    value={data.stop_loss}
                  />
                  {isStopLoss && <div className="invalid-feedback block">Stop loss is more than 10%</div>}
                </div>
              </div>
              <div className="input-wrapper take-profit">
                <div className="__header">
                  <p>Take profit</p>
                  <Toggle active={haveTakeProfit} onClick={(value: boolean) => setHaveTakeProfit(value)} />
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
                    onValueChange={(values) => handleInputChange('taken_profit', values.floatValue)}
                    onBlur={(event) => MaxRateHandle('taken_profit', event)}
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
          <button disabled={!validData || loading} onClick={() => handleCreateTradingCopy()}>
            Start Copy
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStartCopy;
