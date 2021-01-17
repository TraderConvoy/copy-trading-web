import React from 'react';
import InvestmentCalculatorComponent from './components/InvestmentCalculator';

const InvestmentCalculator = () => {
  return (
    <div className="investment-calculator">
      <div className="investment-calculator__header">
        <div className="title-wrapper">
          <p className="title">Calculator</p>
        </div>
      </div>
      <div className="investment-calculator__content">
        <InvestmentCalculatorComponent />
      </div>
    </div>
  );
};

export default React.memo(InvestmentCalculator);
