import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
export const TABLE_YOUR_HISTORY = () => [
  {
    name: 'Time',
    selector: 'opening_time',
    minWidth: '180px',
    cell: (row: any) => {
      return <p>{moment(row.opening_time).format('YYYY-MM-DD HH:mm')}</p>;
    },
  },
  {
    name: 'Type',
    selector: 'type_of_money',
  },
  {
    name: 'Order',
    selector: 'type_of_order',
    minWidth: '80px',
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
    right: true,
    cell: (row: any) => {
      return (
        <p>
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              prefix={'$'}
              decimalScale={2}
              value={row.investment_amount}
            />
          }
        </p>
      );
    },
  },
  {
    name: 'Profit',
    selector: 'profit',
    cell: (row: any) => {
      return row.profit > 0 ? (
        <p className="profit">
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              // prefix={'$'}
              decimalScale={2}
              value={row.profit}
            />
          }
        </p>
      ) : (
        <p className="profit-sharing">
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              // prefix={'$'}
              decimalScale={2}
              value={row.profit}
            />
          }
        </p>
      );
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
          {record.profit > 0 && `+`}{' '}
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              decimalScale={2}
              value={record.profit - record.fee_to_trading - record.fee_to_trading}
            />
          }
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
    selector: 'paidAt',
    cell: (row: any) => {
      return <p className="">{moment(row.paidAt).format('YYYY-MM-DD HH:mm')}</p>;
    },
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
    cell: (row: any) => {
      return (
        <p className="amount">
          {row.type_of_withdraw === 'TRANSFER_TO_WALLET' ? 'Copy Trade Account' : 'Real Account'}
        </p>
      );
    },
  },
  {
    name: 'To',
    selector: 'to',
    cell: (row: any) => {
      return (
        <p className="amount">
          {row.type_of_withdraw !== 'TRANSFER_TO_WALLET' ? 'Copy Trade Account' : 'Real Account'}
        </p>
      );
    },
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

export const TABLE_LEADER_HISTORY = () => [
  {
    name: 'Time',
    selector: 'time',
    minWidth: '190px',
    cell: (row: any) => {
      return <p>{moment(row.time).format('YYYY-MM-DD HH:mm')}</p>;
    },
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
    cell: (row: any) => {
      return (
        <p>
          {<NumberFormat thousandSeparator={true} displayType="text" decimalScale={2} value={row.investment_amount} />}
        </p>
      );
    },
  },
  {
    name: 'Profit',
    selector: 'profit',
    right: true,
    cell: (record: any) => {
      return (
        <p className="profit">
          {' '}
          {record.profit > 0 && `+`}{' '}
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              decimalScale={2}
              value={record.profit - record.fee_to_trading - record.fee_to_trading}
            />
          }
        </p>
      );
    },
  },
];
