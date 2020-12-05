import { TYPE_USER } from 'constant/common';
import config from 'constant/config';
import useError from 'containers/hooks/useErrorContext';
import React, { useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logInAction } from '../redux/actions';
import { IState } from './propsState';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<IState>({
    username: '',
    password: '',
    type: TYPE_USER.USER,
  });
  const [loading, setLoading] = useState(false);
  const { addError } = useError();
  const history = useHistory();

  const handleFormChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setState((oldState) => ({ ...oldState, [type]: event.target.value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    dispatch(
      logInAction(
        {
          username: state.username,
          password: state.password,
          type: 'USER',
          grant_type: 'password',
          client_id: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3bef',
          client_secret: 'password',
          scope: 'offline_access',
        },
        (error: any, result: any) => {
          setLoading(false);
          if (error) addError(error);
          else {
            history.push('/copy-trading/top-leaders');
          }
        },
      ),
    );
  };

  const validData = useMemo(() => {
    for (const value of Object.values(state)) {
      if (!value) return false;
    }
    return true;
  }, [state]);

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__header">
        <div className="logo-wrapper">
          <p className="logo">
            Fast <span>Money</span> <span>Copy Trade</span>
          </p>
        </div>
        <p className="title">Login to your Account</p>
      </div>
      <Form.Group controlId="formEmail">
        <Form.Label>Username Or Email</Form.Label>
        <Form.Control value={state.username} type="text" autoFocus={true} onChange={handleFormChange('username')} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={state.password} type="password" onChange={handleFormChange('password')} />
      </Form.Group>
      <div className="forgot">
        <a href={`${config.TRADING_URL}/forgot-password`}>Forgot Password</a>
      </div>
      <div className="button-wrapper">
        <button type="submit" disabled={!validData || loading}>
          {loading ? <Spinner animation="border" style={{ marginRight: '10px' }} /> : null} Login
        </button>
      </div>
      <div className="dont-have-account">
        <p>
          Don't have account ? <a href={`${config.TRADING_URL}/signup`}>Please sign up</a>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
