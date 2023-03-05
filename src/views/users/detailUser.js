import React, { useState, useEffect } from 'react';

import axiosClient from '../../axiosClient';

import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom';

const DetailUser = () => {
  const [info, setInfo] = useState('');

  const { search } = useLocation();
  console.log(search);
  //const user_id = search.slice(-1);
  // console.log(user_id);
  //const values = queryString.parse(search);
  const values = search.split('=');
  const user_id = values[1];
  console.log(user_id);
  useEffect(() => {
    async function getDetail() {
      try {
        const user = await axiosClient.get(`/users/${user_id}/info`);
        console.log(user);
        setInfo(user.data);
      } catch (err) {
        console.log(err);
      }
    }
    getDetail();
  }, []);

  console.log(info);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thông tin chi tiết người dùng</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="Email" value={info.email} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={info.password} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Is_accepted</Form.Label>
                    <Form.Control type="text" value={info.is_accepted} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" value={info.role_id} />
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
                      <Link className="text-white" to={`/users/edit?user_id=${info.id}`}>
                        Edit
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

export default DetailUser;
