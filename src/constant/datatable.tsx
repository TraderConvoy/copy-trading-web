import React from 'react';

export const TABLE_YOUR_HISTORY = () => [
  {
    name: 'Time',
    selector: 'time',
    minWidth: '190px',
  },
  {
    name: 'Type',
    selector: 'type',
  },
  {
    name: 'Order',
    selector: 'order',
    cell: (row: any) => {
      return <p className={`order ${row.order}`}>{row.order}</p>;
    },
  },
  {
    name: 'Open',
    selector: 'open',
  },
  {
    name: 'Close',
    selector: 'close',
  },
  {
    name: 'Investment',
    selector: 'investment',
  },
  {
    name: 'Profit',
    selector: 'profit',
    cell: (row: any) => {
      return <p className="profit">{row.profit}</p>;
    },
  },
  {
    name: '5% Profit sharing',
    selector: 'profit_sharing',
    minWidth: '150px',
    cell: (row: any) => {
      return <p className="profit-sharing">{row.profit_sharing}</p>;
    },
  },
  {
    name: 'Leader',
    selector: 'leader',
  },
  {
    name: 'Total Profit',
    selector: 'total_profit',
    right: true,
    cell: (row: any) => {
      return <div className="total-profit">{row.total_profit}</div>;
    },
  },
];

export const TABLE_TRADING_HISTORY = () => [
  {
    name: 'Time',
    selector: 'time',
    minWidth: '190px',
  },
  {
    name: 'Type',
    selector: 'type',
  },
  {
    name: 'Order',
    selector: 'order',
    cell: (row: any) => {
      return <p className={`order ${row.order}`}>{row.order}</p>;
    },
  },
  {
    name: 'Open',
    selector: 'open',
  },
  {
    name: 'Close',
    selector: 'close',
  },
  {
    name: 'Investment',
    selector: 'investment',
  },
  {
    name: 'Profit',
    selector: 'profit',
    right: true,
    cell: (row: any) => {
      return <p className="profit">{row.profit}</p>;
    },
  },
];

export const TABLE_PROFIT_SHARING_HISTORY = () => [
  {
    name: 'Time',
    selector: 'time',
    minWidth: '190px',
  },
  {
    name: 'Type',
    selector: 'type',
  },
  {
    name: 'Order',
    selector: 'order',
    cell: (row: any) => {
      return <p className={`order ${row.order}`}>{row.order}</p>;
    },
  },
  {
    name: 'Open',
    selector: 'open',
  },
  {
    name: 'Close',
    selector: 'close',
  },
  {
    name: 'Investment',
    selector: 'investment',
  },
  {
    name: '5% Profit sharing',
    selector: 'profit_sharing',
    cell: (row: any) => {
      return <p className="profit-sharing">{row.profit_sharing}</p>;
    },
  },
  {
    name: 'User name',
    selector: 'username',
    right: true,
  },
];

export const TABLE_TRANSFER_HISTORY = () => [
  {
    name: 'Time',
    selector: 'time',
  },
  {
    name: 'Amount',
    selector: 'amount',
    cell: (row: any) => {
      return <p className="amount">{row.amount}</p>;
    },
  },
  {
    name: 'From',
    selector: 'from',
  },
  {
    name: 'To',
    selector: 'to',
  },
  {
    name: 'Status',
    selector: 'status',
    cell: (row: any) => {
      return <p className="status">{row.status}</p>;
    },
    right: true,
  },
];
