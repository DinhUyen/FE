import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';

import axiosClient from '../../../axiosClient';

import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom';

const InfoContainer = () => {
  const [info, setInfo] = useState('');
  useEffect(() => {
    async function getDetail() {
      try {
        const res = await axiosClient.get(`/dockers/info`);
        console.log(res.data);
        setInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getDetail();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thông tin tất cả docker</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                {/* <Col sm={12}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Thông tin docker</Form.Label>
                    <Form.Control as="textarea" rows="20" value={JSON.stringify(JSON.parse(info))} />
                  </Form.Group>
                </Col> */}
              <Col sm={12}>
                  <ReactJson src={info} />
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
