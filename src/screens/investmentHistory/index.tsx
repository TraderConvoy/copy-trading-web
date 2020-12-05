import Loading from 'containers/components/Loading';
import ModalConfirm, { initializeModal } from 'containers/components/ModalConfirm';
import Pagination from 'containers/components/Pagination';
import useError from 'containers/hooks/useErrorContext';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import InvestmentHistoryItem from './components/InvestmentHistoryItem';
import {
  getListTradingCopyAction,
  pauseTradingCopyAction,
  resumeTradingCopyAction,
  stopTradingCopyAction,
} from './ducks/actions';

const initializePage = {
  number: 1,
  perPage: 6,
};

const InvestmentHistory = () => {
  const dispatch = useDispatch();
  const [modalCf, setModalCf] = useState({ ...initializeModal });
  const [pageLoading, setPageLoading] = useState(true);
  const [data, setData] = useState({ data: [], count: 0 });
  const [page, setPage] = useState({ ...initializePage });
  const { addError } = useError();

  useEffect(() => {
    handleGetListTradingCopy();
  }, [page]);

  const closeModalConfirm = () => {
    setModalCf({ ...initializeModal });
  };

  const handleGetListTradingCopy = () => {
    setPageLoading(true);
    const body = {
      page: page.number,
      size: page.perPage,
    };
    dispatch(
      getListTradingCopyAction(body, (err, res: any) => {
        if (err) addError(err, null);
        else setData(res);
        setPageLoading(false);
      }),
    );
  };

  const handlePageChange = (page: number) => {
    setPage((oldState) => ({ ...oldState, number: page }));
  };

  const handleStop = (id_copy) => {
    const body = {
      id_copy,
    };
    setModalCf((oldState) => ({
      ...oldState,
      isOpen: true,
      title: 'Confirm',
      content: 'Are you sure you want to stop copy ?',
      cancelContent: 'Cancel Stop',
      submitContent: 'Stop',
      handleCancel: () => closeModalConfirm(),
      handleSubmit: () =>
        dispatch(
          stopTradingCopyAction(body, (err, res) => {
            if (err) addError(err, null);
            closeModalConfirm();
            handlePageChange(1);
          }),
        ),
    }));
  };

  const handleResume = (id_copy) => {
    const body = {
      id_copy,
    };
    setModalCf((oldState) => ({
      ...oldState,
      isOpen: true,
      title: 'Confirm',
      content: 'Are you sure you want to start copy ?',
      cancelContent: 'Cancel Start',
      submitContent: 'Start',
      handleCancel: () => closeModalConfirm(),
      handleSubmit: () =>
        dispatch(
          resumeTradingCopyAction(body, (err, res) => {
            if (err) addError(err, null);
            closeModalConfirm();
            handlePageChange(1);
          }),
        ),
    }));
  };

  const handlePause = (id_copy) => {
    const body = {
      id_copy,
    };
    setModalCf((oldState) => ({
      ...oldState,
      isOpen: true,
      title: 'Confirm',
      content: 'Are you sure you want to pause copy ?',
      cancelContent: 'Cancel Pause',
      submitContent: 'Pause',
      handleCancel: () => closeModalConfirm(),
      handleSubmit: () =>
        dispatch(
          pauseTradingCopyAction(body, (err, res) => {
            if (err) addError(err, null);
            closeModalConfirm();
            handlePageChange(1);
          }),
        ),
    }));
  };

  return (
    <React.Fragment>
      <ModalConfirm
        isOpen={modalCf.isOpen}
        title={modalCf.title}
        content={modalCf.content}
        cancelContent={modalCf.cancelContent}
        submitContent={modalCf.submitContent}
        handleCancel={modalCf.handleCancel}
        handleSubmit={modalCf.handleSubmit}
      />
      <div className="investment-history">
        <div className="investment-history__header">
          <div className="title-wrapper">
            <p className="title">Investment History</p>
          </div>
        </div>
        <div className="investment-history__content">
          <Loading isLoading={pageLoading}>
            <div className="history-wrapper">
              {data.data.map((item: any) => {
                return (
                  <InvestmentHistoryItem
                    handlePause={handlePause}
                    handleStart={handleResume}
                    handleStop={handleStop}
                    key={item._id}
                    item={item}
                  />
                );
              })}
            </div>
          </Loading>
          <Pagination
            page={page.number}
            perPage={page.perPage}
            count={data.count}
            pageChange={(page: number) => handlePageChange(page)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(InvestmentHistory);
