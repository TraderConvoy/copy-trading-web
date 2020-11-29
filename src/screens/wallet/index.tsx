import React from 'react';
import TableTransferHistory from './components/TableTransferHistory';
import Transfer from './components/Transfer';

const fakeItem = {
  time: '18/11/2020 - 18:20:39',
  amount: '95 USD',
  from: 'Real Account',
  to: 'Copy trade account',
  status: 'Success',
};

const Wallet = () => {
  const fakeData = Array(70).fill(fakeItem);
  return (
    <div className="wallet">
      <div className="title-wrapper">
        <p className="title">Wallet</p>
        <p className="sub">To start copy trade you need transfer money from Real account to Copy trade account</p>
      </div>
      <Transfer />
      <p className="section-name">Tranfer History</p>
      <TableTransferHistory data={fakeData} />
    </div>
  );
};

export default React.memo(Wallet);
