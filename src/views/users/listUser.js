import React, { useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../../axiosClient';

const ListUsers = () => {
  const [listUsers, setlistUsers] = useState();
  const [changeStatus, setChangeStatus] = useState(true);
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get('/users/list');
      console.log(res.data.items);
      setlistUsers((listUsers) => [...res.data.items]);
    }
    getItem();
  }, [changeStatus]);

  // async function Is_accepted(id) {
  //   console.log(id);
  //   const data = await axiosClient.post(`/users/${id}/accept`);
  //   setChangeStatus(!changeStatus);
  //   alert(data.data.message);
  // }
  async function disableAccount(id) {
    try {
      const res = await axiosClient.get(`/users/${id}/disable`);
      setChangeStatus(!changeStatus);
      // console.log(res);
      // alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  async function enableAccount(id) {
    try {
      const res = await axiosClient.get(`/users/${id}/enable`);
      // console.log(res);
      // alert(res.data.message);
      setChangeStatus(!changeStatus);
    } catch (err) {
      console.log(err);
    }
  }
  // const [is_accepted, setIs_accepted] = useState();

  // async function change_Accepted(id) {
  //   const data = {
  //     is_accepted: false
  //   };
  //   const res = await axiosClient.put(`/users/${id}/update`, data);
  //   setChangeStatus(!changeStatus);
  // }

  return (
    <React.Fragment>
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
                            <Link to={`/users/detail?user_id=${item.id}`} className="feather icon-info text-primary f-15 m-r-5"></Link>
                            <Link to={`/users/delete?user_id=${item.id}`} className="feather icon-trash text-danger f-15 m-r-5"></Link>
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
