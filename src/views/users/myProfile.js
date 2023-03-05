import React, { useState, useEffect } from 'react';

import axiosClient from '../../axiosClient';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const [detailMe, setDetaiMe] = useState('');
  useEffect(() => {
    async function getDetailUser() {
      const res = await axiosClient.get(`users/me`);
      console.log(res);
      setDetaiMe(res.data);
    }
    getDetailUser();
  }, []);
  console.log(detailMe);
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thông tin người dùng hiện tại </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.id} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Finished</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.finished} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.email} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Is_accepted</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.is_accepted} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Role_id</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.role_id} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Running</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.running} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Total_alert</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.total_alert} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Total_scan</Form.Label>
                    <Form.Control type="text" placeholder="Text" value={detailMe.total_scan} />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Button className="bg-primary">
                      <Link className="text-white" to={'/users/list'}>
                        Back
                      </Link>
                    </Button>
                    <Button className="bg-primary">
                      <Link className="text-white" to={'/users/changePassword'}>
                        Đổi mật khẩu
                      </Link>
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

export default MyProfile;
