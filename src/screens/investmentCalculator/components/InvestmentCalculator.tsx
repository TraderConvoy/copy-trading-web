import React, { useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const initializeState = {
  profit: '',
  profitability: '',
};

const listMonth = [1, 2, 3, 6, 12];

const InvestmentCalculator = () => {
  const [data, setData] = useState({ ...initializeState });
  const [calculatorData, setCalculatorData] = useState({ profit: 0, profitability: 0, month: 1 });

  const handleInputChange = (name, value) => {
    setData((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleCaculator = () => {
    setCalculatorData((oldState) => {
      const profit = ((parseFloat(data.profit) * parseFloat(data.profitability)) / 100) * oldState.month;
      const profitability = parseFloat(data.profitability) * oldState.month;
      return { ...oldState, profit, profitability };
    });
  };

  const handleMonthChange = (value) => {
    setCalculatorData((oldState) => ({ ...oldState, month: value }));
  };

  const validData = useMemo(() => {
    if (parseFloat(data.profit) < 500) return false;
    if (!parseFloat(data.profitability)) return false;
    return true;
  }, [data]);

  return (
    <div className="investment-calculator-component">
      <div className="__header">
        <p className="title">Investment Calculator</p>
        <p className="sub">500 USD is minimum required deposit for this trader</p>
      </div>
      <div className="__search">
        <div className="item deposit-wrapper">
          <p>Deposit</p>
          <div className="search-wrapper">
            <p>USD</p>
            <input value={data.profit} onChange={(event) => handleInputChange('profit', event.target.value)} />
          </div>
        </div>
        <div className="item profitability-wrapper">
          <p>Profitability</p>
          <div className="search-wrapper">
            <p>%</p>
            <input
              value={data.profitability}
              onChange={(event) => handleInputChange('profitability', event.target.value)}
            />
          </div>
        </div>
        <div className="item investment-period-wrapper">
          <p>Investment period</p>
          <div className="tab-wrapper">
            <Container fluid={true}>
              <Row>
                {/* <Col sm={true} className="p-0 m-0">
                  <button className="tab">7 days</button>
                </Col> */}
                {listMonth.map((item) => {
                  return (
                    <Col key={item} sm={true} className="p-0 m-0">
                      <button
                        className={`tab ${item === calculatorData.month ? 'active' : ''}`}
                        onClick={() => handleMonthChange(item)}
                      >
                        {item} months
                      </button>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <div className="__detail">
        <div className="item estimate-profit-wrapper">
          <p>Estimate profit</p>
          <p className="total">{calculatorData.profit} USD</p>
        </div>
        <div className="item estimate-profitability-wrapper">
          <p>Estimate profitability</p>
          <p className="total">{calculatorData.profitability} %</p>
        </div>
        {/* <div className="item profit-sharing-wrapper">
          <p>Profit sharing</p>
          <p className="total">4.05 USD</p>
        </div> */}
      </div>
      <div className="__button">
        <button disabled={!validData} onClick={() => handleCaculator()}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
