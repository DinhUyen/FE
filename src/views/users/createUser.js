import React, { useState, useEffect } from 'react';

import axiosClient from '../../axiosClient';

import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CreateNewUsers = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [is_accepted, setIs_accepted] = useState();
  const [role, setRole] = useState();
  async function createUser() {
    const data = {
      email: email,
      password: password,
      is_accepted: is_accepted,
      role: role
    };
    const res = await axiosClient.post('users/create', data);
    //console.log(res);
    alert('Thêm mới thành công');
  }

  const history = useHistory();
  const goBack = () => history.push('/users/list');
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thêm mới người dùng</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="Email" onChange={(event) => setEmail(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(event) => setPassword(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Is_accepted</Form.Label>
                    <Form.Control type="text" onChange={(event) => setIs_accepted(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Role_id</Form.Label>
                    <Form.Control type="text" onChange={(event) => setRole(event.target.value)} />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Button className="primary" onClick={createUser}>
                      Thêm
                    </Button>
                    <Button className="primary" onClick={goBack}>
                      Back
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

export default CreateNewUsers;
