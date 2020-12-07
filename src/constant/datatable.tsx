import React from 'react';

export const TABLE_YOUR_HISTORY = () => [
  {
    name: 'Time',
    selector: 'opening_time',
    minWidth: '190px',
  },
  {
    name: 'Type',
    selector: 'type_of_money',
  },
  {
    name: 'Order',
    selector: 'type_of_order',
    cell: (row: any) => {
      return <p className={`order ${row.type_of_order}`}>{row.type_of_order}</p>;
    },
  },
  {
    name: 'Open',
    selector: 'opening_price',
  },
  {
    name: 'Close',
    selector: 'closing_price',
  },
  {
    name: 'Investment',
    selector: 'investment_amount',
  },
  {
    name: 'Profit',
    selector: 'profit',
    cell: (row: any) => {
      return row.profit > 0 ? <p className="profit">{row.profit}</p> : <p className="profit-sharing">{row.profit}</p>;
    },
  },
  {
    name: '5% Profit sharing',
    selector: 'fee_to_expert',
    minWidth: '150px',
    cell: (row: any) => {
      return <p className="profit-sharing">{row.fee_to_expert}</p>;
    },
  },
  {
    name: 'Leader',
    selector: 'leader',
    cell: (record: any) => {
      return (
        <div className="">
          <p>{record?.expert[0]['username']}</p>
        </div>
      );
    },
  },
  {
    name: 'Total Profit',
    right: true,
    cell: (record: any) => {
      return (
        <div className="total-profit">
          {record.profit > 0 && `+`} {(record.profit - record.fee_to_trading - record.fee_to_trading).toFixed(2)}
        </div>
      );
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
