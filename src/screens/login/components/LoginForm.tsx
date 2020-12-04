import React, { useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';

const initializeForm = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initializeForm);

  const handleFormChange = (type: string, value: string) => {
    setFormData((oldState) => ({ ...oldState, [type]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('submit');
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
          type="email"
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
