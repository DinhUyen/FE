import React, { useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../../../axiosClient';

const ListImages = () => {
  const [listImage, setListImage] = useState();
  const [changeStatus, setChangeStatus] = useState(true);
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get('/dockers/image');
      console.log(res.data.Items);
      setListImage((listImage) => [...res.data.Items]);
    }
    getItem();
  }, [changeStatus]);
  async function deleteImage(id) {
    try {
      const data = {
        id: id
      };
      await axiosClient.delete('/dockers/image', data);
    } catch (err) {
      console.log(err);
    }
  }
  async function updateImage(id) {
    try {
      const data = {
        id: id
      };
      await axiosClient.put('/dockers/image', data);
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
              <Card.Title as="h5">Danh sách docker image</Card.Title>
            </Card.Header>

            <Card.Body>
              <Button className="bg-primary">
                <Link className="text-white" to={'/users/create'}>
                  Thêm mới image
                </Link>
              </Button>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên image</th>
                    <th>Tag</th>
                    <th>Thời gian tạo</th>
                    <th>Kích thước</th>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  {listImage &&
                    listImage.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.repository}</td>
                          <td>{item.tag}</td>
                          <td>{item.created}</td>
                          <td>{item.Size}</td>

                          <td>
                            <Link
                              to={`/setting/docker/image`}
                              className="feather icon-trash text-danger f-15 m-r-5"
                              onClick={deleteImage(item.id)}
                            ></Link>
                            <Link
                              to={`/setting/docker/image`}
                              className="feather icon-edit text-warning f-15 m-r-5"
                              onClick={updateImage(item.id)}
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

export default ListImages;
