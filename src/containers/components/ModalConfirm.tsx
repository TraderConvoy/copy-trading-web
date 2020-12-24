import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const initializeModal = {
  isOpen: false,
  title: 'Confirm',
  content: 'Are you sure ?',
  cancelContent: '',
  submitContent: '',
  subContent: '',
  handleCancel: () => {},
  handleSubmit: () => {},
};

const ModalConfirm = ({
  title,
  content,
  isOpen,
  cancelContent,
  submitContent,
  handleCancel,
  handleSubmit,
  subContent,
}) => {
  const loading = useSelector((state: any) => state.common.loading);
  return (
    <Modal show={isOpen} onHide={() => handleCancel()} className="modal-confirm" size="lg">
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        {content}
        {subContent && (
          <Alert style={{ marginTop: 20 }} variant="warning">
            {subContent}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="button-wrapper">
          <button className="cancel-button" onClick={() => handleCancel()} disabled={loading}>
            {cancelContent ? cancelContent : 'Cancel'}
          </button>
          <button className="submit-button" onClick={() => handleSubmit()} disabled={loading}>
            {submitContent ? submitContent : 'Submit'}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
