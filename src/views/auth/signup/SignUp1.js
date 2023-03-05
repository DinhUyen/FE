import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import axiosClient from '../../../axiosClient';
import { useState } from 'react';
const SignUp1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleSignUp = async () => {
    const data = {
      email: email,
      password: password
    };
    const res = await axiosClient.post('/auth/register', data);
    alert(res.data.message);
    history.push('/auth/login');
  };
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Sign up</h3>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={false} />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Send me the <Link to="#"> Newsletter</Link> weekly.
                    </label>
                  </div>
                  <button className="btn btn-primary mb-4" onClick={handleSignUp}>
                    Sign up
                  </button>
                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to="/auth/signin-1" className="f-w-400">
                      Login
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
