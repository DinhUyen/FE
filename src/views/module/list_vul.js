import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import axiosClient from '../../axiosClient';


const ListVul = () => {

    const [vulList, setVulList] = useState([]);

    useEffect(() => {
        axiosClient.get('/modules/group')
            .then(response => {
                setVulList(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            <Row>
                {vulList.slice(0, 2).map(vul => (
                    <Col key={vul.id} className="mb-4">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={vul.image} />
                            <Card.Body>
                                <Card.Title>{vul.title}</Card.Title>
                                <Card.Text>{vul.description}</Card.Text>
                                <Link to={`/vul/${vul.id}`}>
                                    <Button variant="primary">View</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                {vulList.slice(2, 4).map(vul => (
                    <Col key={vul.id} className="mb-4">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={vul.image} />
                            <Card.Body>
                                <Card.Title>{vul.title}</Card.Title>
                                <Card.Text>{vul.description}</Card.Text>
                                <Link to={`/vul/${vul.id}`}>
                                    <Button variant="primary">View</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ListVul;
