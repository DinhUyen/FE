import React, { useState, useEffect } from 'react';

import axiosClient from '../../../axiosClient';

import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom';

const InfoContainer = () => {
  const [resource, setRource] = useState('');
  useEffect(() => {
    async function getResource() {
      try {
        const res = await axiosClient.get(`/dockers/resource`);
        setRource(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getResource();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thông tin docker</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Thông tin docker</Form.Label>
                    <Form.Control as="textarea" rows="20" value={JSON.stringify(resource)} />
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

export default InfoContainer;
