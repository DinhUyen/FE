import React, { useState, useEffect } from 'react';

import axiosClient from '../../axiosClient';

import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const User = () => {
  const [info, setInfo] = useState(''); 
  const history = useHistory();
  const { search } = useLocation();
  //console.log(search);
  const values = search.split('=');
  const user_id = values[1];
  //console.log(user_id);
  useEffect(() => {
    async function getDetail() {
      try {
        const user = await axiosClient.get(`/users/${user_id}/info`);
        //console.log(user);
        setInfo(user.data);
      } catch (err) {
        console.log(err);
      }
    }
    getDetail();
  }, []);

  const [password, setPassword] = useState(null);
  const [is_accepted, setIs_accepted] = useState(null);
  const [role_id, setRole_Id] = useState(null);
  const data = {
    password: password,
    is_accepted: is_accepted,
    role_id: role_id
  };
  async function editUser(id) {
    try {
      console.log(data);
      console.log(id);
      const res = await axiosClient.put(`/users/${id}/update`, data);
      history.push('/users/list');

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Chỉnh sửa thông tin</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" value={data.password} onChange={(event) => setPassword(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Is_accepted</Form.Label>
                    <Form.Control type="text" value={data.is_accepted} onChange={(event) => setIs_accepted(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Role_id</Form.Label>
                    <Form.Control type="text" value={data.role_id} onChange={(event) => setRole_Id(event.target.value)} />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Button
                      className="bg-primary"
                      onClick={() => {
                        editUser(info.id);
                      }}
                    >
                      <Link className="text-white" to="#">
                        Save
                      </Link>
                    </Button>
                    <Button className="bg-primary">
                      <Link className="text-white" to={'/users/list'}>
                        Back
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

export default User;
