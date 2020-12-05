import React, { useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logInAction } from '../ducks/actions';

const initializeForm = {
  username: '',
  password: '',
  type: 'USER',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initializeForm);
  const handleFormChange = (type: string, value: string) => {
    setFormData((oldState) => ({ ...oldState, [type]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //:TODO Hardcode
    let data = {
      username: formData.username,
      password: formData.password,
      type: 'USER',
      grant_type: 'password',
      client_id: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3bef',
      client_secret: 'password',
      scope: 'offline_access',
    };
    dispatch(
      logInAction(data, () => {
        console.log('success');
      }),
    );
  };

  const validData = useMemo(() => {
    for (const value of Object.values(formData)) {
      if (!value) return false;
    }
    return true;
  }, [formData]);

  return (
    <Form className="login-form" onSubmit={(event) => handleSubmit(event)}>
      <div className="login-form__header">
        <div className="logo-wrapper">
          <p className="logo">
            Fast <span>Money</span>
          </p>
        </div>
        <p className="title">Login to your Account</p>
      </div>
      <Form.Group controlId="formEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={formData.username}
          type="text"
          placeholder="Your email"
          onChange={(event) => handleFormChange('username', event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={formData.password}
          type="password"
          placeholder="Please Input your password"
          onChange={(event) => handleFormChange('password', event.target.value)}
        />
      </Form.Group>
      <div className="type-wrapper">
        <label>
          Pick your account type
          <select value={formData.type} onChange={(event) => handleFormChange('type', event.target.value)}>
            <option value="USER">User</option>
            <option value="EXPERT">Expert</option>
          </select>
        </label>
      </div>
      <div className="forgot">
        <a href="/forgot-password">Forgot Password</a>
      </div>
      <div className="button-wrapper">
        <button type="submit" disabled={!validData}>
          Login
        </button>
      </div>
      <div className="dont-have-account">
        <p>
          Don't have account ? <a href="/signup">Please sign up</a>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
