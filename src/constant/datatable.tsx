import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
import { formatter } from 'utils/utilities';

export const TABLE_YOUR_HISTORY = () => [
  {
    name: 'Time',
    selector: 'opening_time',
    maxWidth: '120px',
    center: true,
    cell: (row: any) => {
      return <p>{moment(row.opening_time).format('YYYY-MM-DD HH:mm:ss')}</p>;
    },
  },
  {
    name: 'Type',
    selector: 'type_of_money',
    maxWidth: '100px',
    center: true,
  },
  {
    name: 'Order',
    selector: 'type_of_order',
    maxWidth: '50px',
    center: true,
    cell: (row: any) => {
      return <p className={`order ${row.type_of_order}`}>{row.type_of_order}</p>;
    },
  },
  {
    name: 'Open',
    selector: 'opening_price',
    maxWidth: '80px',
    center: true,
    cell: (row: any) => {
      return (
        <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.opening_price} decimalScale={0} />}</>
      );
    },
  },
  {
    name: 'Close',
    selector: 'closing_price',
    maxWidth: '80px',
    center: true,
    cell: (row: any) => {
      return (
        <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.closing_price} decimalScale={0} />}</>
      );
    },
  },
  {
    name: 'Amount of investment',
    selector: 'investment_amount',
    maxWidth: '180px',
    center: true,
    cell: (row: any) => {
      return (
        <p>
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              prefix={'$ '}
              decimalScale={0}
              value={row.investment_amount}
            />
          }
        </p>
      );
    },
  },
  {
    name: 'Investment',
    selector: 'profit',
    maxWidth: '80px',
    center: true,
    cell: (row: any) => {
      return row.profit > 0 ? (
        <p className="profit">
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              // prefix={'$'}
              decimalScale={0}
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
                decimalScale={0}
                value={row.order_amount}
              />
            }
          </p>
        );
    },
  },
  {
    name: '5% Profit sharing',
    selector: 'fee_to_expert',
    maxWidth: '140px',
    center: true,
    cell: (row: any) => {
      return <p className="profit-sharing">{row.fee_to_expert}</p>;
    },
  },
  {
    name: 'Leader',
    selector: 'leader',
    maxWidth: '100px',
    center: true,
    cell: (record: any) => {
      return (
        <div className="">
          <p>{record?.expert.length !== 0 ? record?.expert[0]['username'] : ''}</p>
        </div>
      );
    },
  },
  {
    name: 'Total Profit',
    center: true,
    cell: (record: any) => {
      return (
        <div className="total-profit">
          {record.status
            ? record.status && record.profit > 0
              ? `+ ${formatter.format(record.profit - record.fee_to_expert - record.fee_to_trading)}`
              : 0
            : 'Updating'}
        </div>
      );
    },
  },
];

export const TABLE_TRADING_HISTORY = () => [
  {
    name: 'Time',
    selector: 'time',
    maxWidth: '190px',
    cell: (row: any) => {
      return <p className="">{moment.utc(row.time).local().format('YYYY-MM-DD HH:mm:ss')}</p>;
    },
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
    cell: (row: any) => {
      return <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.open} decimalScale={0} />}</>;
    },
  },
  {
    name: 'Close',
    selector: 'close',
    cell: (row: any) => {
      return <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.close} decimalScale={0} />}</>;
    },
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
    maxWidth: '190px',
    cell: (row: any) => {
      return <p className="">{moment.utc(row.time).local().format('YYYY-MM-DD HH:mm:ss')}</p>;
    },
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
    cell: (row: any) => {
      return <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.open} decimalScale={0} />}</>;
    },
  },
  {
    name: 'Close',
    selector: 'close',
    cell: (row: any) => {
      return <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.close} decimalScale={0} />}</>;
    },
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
      return <p className="">{moment.utc(row.paidAt).local().format('YYYY-MM-DD HH:mm:ss')}</p>;
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
    maxWidth: '190px',
    cell: (row: any) => {
      return <p>{moment(row.opening_time).format('YYYY-MM-DD HH:mm:ss')}</p>;
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
    cell: (row: any) => {
      return (
        <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.opening_price} decimalScale={0} />}</>
      );
    },
  },
  {
    name: 'Close',
    selector: 'closing_price',
    cell: (row: any) => {
      return (
        <>{<NumberFormat thousandSeparator={true} displayType="text" value={row.closing_price} decimalScale={0} />}</>
      );
    },
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
        <p className={`profit ${record.profit === 0 && 'loss'}`}>
          {record.profit > 0 && `+`}
          {
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              decimalScale={2}
              value={record.profit - record.fee_to_expert - record.fee_to_trading}
            />
          }
        </p>
      );
    },
  },
];

export const ORDER_USER_HISTORY = () => [
  {
    name: 'Time',
    selector: 'createAt',
    maxWidth: '190px',
    cell: (row: any) => {
      return <p>{moment.utc(row.createAt).local().format('YYYY-MM-DD HH:mm:ss')}</p>;
    },
  },
  {
    name: 'Amount of investment',
    selector: 'base_amount',
    cell: (row: any) => {
      return (
        <p> {<NumberFormat thousandSeparator={true} displayType="text" decimalScale={2} value={row.base_amount} />}</p>
      );
    },
  },
  {
    name: 'Profit',
    selector: 'investment_amount',
    cell: (row: any) => {
      return (
        <p>
          {' '}
          {<NumberFormat thousandSeparator={true} displayType="text" decimalScale={2} value={row.investment_amount} />}
        </p>
      );
    },
  },
  {
    name: 'Percentage gain',
    selector: 'status',
    cell: (row: any) => {
      return (
        <p className="status">
          {' '}
          <NumberFormat
            thousandSeparator={true}
            displayType="text"
            decimalScale={2}
            value={((row.investment_amount - row.base_amount) * 100) / row.base_amount}
          />{' '}
          %
        </p>
      );
    },
  },
  {
    name: 'Status',
    selector: 'status',
    cell: (row: any) => {
      return <p className="tag">{row.status}</p>;
    },
  },
];
