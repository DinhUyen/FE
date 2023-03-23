import React, { useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../../../axiosClient';

const ListContainers = () => {
  const [listContainter, setListContainer] = useState();
  const [changeStatus, setChangeStatus] = useState(true);
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get('/dockers/container');
      console.log(res.data.Items);
      setListContainer((listContainter) => [...res.data.Items]);
    }
    getItem();
  }, [changeStatus]);

  function stopContainer(id) {
    try {
      alert('Stopped container');
      const data = {
        id: id
      };
      const res = axiosClient.post(`/dockers/container`, data);
      console.log(res);
      if (res === null) {
        setChangeStatus(!changeStatus);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function deleteContainer(id) {
    try {
      const data = {
        id: id
      };
      axiosClient.delete(`/dockers/container`, data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Danh sách docker container</Card.Title>
            </Card.Header>

            <Card.Body>
              <Button className="bg-primary">
                <Link className="text-white" to={'/setting/docker/info'}>
                  Thông tin tất cả docker
                </Link>
              </Button>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên container</th>
                    <th>Tên image</th>
                    <th>ID image</th>
                    <th>Thời gian tạo</th>
                    <th>Trạng thái</th>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  {listContainter &&
                    listContainter.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.image_name}</td>
                          <td>{item.iamges_id}</td>
                          <td>{item.created}</td>
                          <td>
                            {!changeStatus ? (
                              <Link to="#" className="label text-success f-12">
                                Đang chạy
                              </Link>
                            ) : (
                              <Link to="#" className="label text-warning f-12">
                                Đã dừng
                              </Link>
                            )}
                          </td>
                          <td>
                            <Link to={`/setting/docker/resource/`} className="feather icon-info text-primary f-15 m-r-5"></Link>
                            {!changeStatus ? (
                              <Link
                                to="#"
                                className="feather icon-pause-circle text-primary f-15 m-r-5"
                                onClick={() => {
                                  stopContainer(item.id);
                                }}
                              ></Link>
                            ) : (
                              <Link className="feather icon-play text-primary f-15 m-r-5"></Link>
                            )}

                            <Link
                              to="/setting/docker/container"
                              className="feather icon-trash text-danger f-15 m-r-5"
                              onClick={() => {
                                deleteContainer(item.id);
                              }}
                            ></Link>
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

export default ListContainers;
