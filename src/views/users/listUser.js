import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../../axiosClient';

const ListUsers = () => {
  const [listUsers, setlistUsers] = useState();
  const [changeStatus, setChangeStatus] = useState(true);
  const [check, setCheck] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get('/users/list');
      console.log(res.data.items);
      setlistUsers((listUsers) => [...res.data.items]);
    }
    getItem();
  }, [changeStatus, show])

  async function disableAccount(id) {
    try {
      const res = await axiosClient.get(`/users/${id}/disable`);
      setChangeStatus(!changeStatus);
    } catch (err) {
      console.log(err);
    }
  }

  async function enableAccount(id) {
    try {
      const res = await axiosClient.get(`/users/${id}/enable`);
      setChangeStatus(!changeStatus);
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteUser(id) {
    try {
      const res = await axiosClient.delete(`/users/${id}/delete`);
      console.log(res);
      alert('Xóa tài khoản thành công !');
      setChangeStatus(!changeStatus);
    } catch (err) {
      console.log(err);
    }
  }
  const [info, setInfo] = useState();
  async function getDetail(id) {
    setShow(true);
    console.log(id);
    const user = await axiosClient.get(`/users/${id}/info`);
    console.log(user.data);
    setInfo(user.data);
  }
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {info ? (
              <Col md={12}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" value={info.email} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Is_accepted</Form.Label>
                  <Form.Control type="text" value={info.is_accepted} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Role</Form.Label>
                  <Form.Control type="text" value={info.role_id} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Running</Form.Label>
                  <Form.Control type="text" value={info.running} />
                </Form.Group>
              </Col>
            ) : (
              ''
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Danh sách người dùng</Card.Title>
            </Card.Header>

            <Card.Body>
              <Button className="bg-primary">
                <Link className="text-white" to={'/users/create'}>
                  Thêm mới người dùng
                </Link>
              </Button>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Email</th>

                    <th>Quyền</th>
                    {/* <th>Running</th>
                    <th>Finished</th> */}
                    <th>Tổng số lần quét</th>
                    <th>Trạng thái</th>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  {listUsers &&
                    listUsers.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.role_id && item.role_id === 1 ? (
                              <Link to="#" className="feather icon-user-plus text-danger f-15 m-r-5">
                                Admin
                              </Link>
                            ) : (
                              <Link to="#" className="feather icon-user  text-primary f-15 m-r-5">
                                User
                              </Link>
                            )}
                          </td>
                          {/* <td>{item.running}</td>
                          <td>{item.finished}</td> */}
                          <td>{item.total_scan}</td>
                          <td>
                            {item.is_accepted === true ? (
                              <Link
                                to="#"
                                className="label text-success f-12"
                                onClick={() => {
                                  disableAccount(item.id);
                                }}
                              >
                                Đã duyệt
                              </Link>
                            ) : (
                              <Link
                                to="#"
                                className="label text-warning f-12"
                                onClick={() => {
                                  enableAccount(item.id);
                                }}
                              >
                                Đang chờ phê duyệt
                              </Link>
                            )}
                          </td>
                          <td>
                            <Link
                              className="feather icon-info text-primary f-15 m-r-5"
                              onClick={() => {
                                getDetail(item.id);
                              }}
                            ></Link>
                            <Link
                              to="/users/list"
                              className="feather icon-trash text-danger f-15 m-r-5"
                              onClick={() => {
                                deleteUser(item.id);
                              }}
                            ></Link>
                            <Link to={`/users/edit?user_id=${item.id}`} className="feather icon-edit text-warning f-15 m-r-5"></Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ListUsers;
