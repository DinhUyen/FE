import React, { useState, useEffect } from 'react';

import axiosClient from '../../axiosClient';
import { useLocation, useHistory } from 'react-router-dom';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
  const [password_old, setPassword_old] = useState('');
  const [password_new, setPassword_new] = useState('');
  const history = useHistory();

  async function changePassword() {
    const data = {
      password_old: password_old,
      password_new: password_new
    };
    const res = await axiosClient.post('users/change_password', data);
    alert(res.data.message);
    history.push('/users/list');
  }

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thay đổi mật khẩu </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Mật khẩu cũ</Form.Label>
                    <Form.Control type="text" placeholder="Text" onChange={(event) => setPassword_old(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control type="text" placeholder="Text" onChange={(event) => setPassword_new(event.target.value)} />
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Button className="primary">Trở lại</Button>
                    <Button
                      className="primary"
                      onClick={() => {
                        changePassword();
                      }}
                    >
                      Lưu thay đổi
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ChangePassword;
