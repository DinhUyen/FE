import React, { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { auto } from 'async';

const Website = () => {
  const [listTargets, setlistTargets] = useState([]);
  const [id, setId] = useState();
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get('targets');
      console.log(res);
      setlistTargets((listTargets) => [...res.data.items]);
    }
    getItem();
  }, []);
  const [url, setUrl] = useState();
  const [name, setName] = useState();
  console.log(url, name);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAdd, setShowAdd] = useState(false);
  function getId(id) {
    setShow(true);
    setId(id);
  }
  const UpdateTarget = async () => {
    const target = await axiosClient.post('/targets', {
      name: name,
      address: url,
      id: id
    });

    setShow(false);
  };
  async function createScan(id) {
    console.log(id);
    const res = await axiosClient.post('/scans', {
      target_id: id,
      config: ''
    });
    console.log(res);
  }
  const handleAddtarget = (e) => {
    e.preventDefault();
    console.log(url, name);
    const data = { address: url, name: name };
    axiosClient.put('targets', data).then((res) => {
      if (res.status == 201) {
        alert('Thêm thành công');
      }
      setShowAdd(false);
    });
  };
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa mục tiêu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="form-group">
              <input
                className="form-control url"
                placeholder="Website URL (e.g.. yourdomain.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div class="form-group">
              <input className="form-control url" placeholder="Website name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateTarget}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <Card>
            <Row>
              <Card.Header>
                <Card.Title as="h5">Danh sách đối tượng</Card.Title>
              </Card.Header>
              <button
                type="button"
                style={{ borderRadius: '30px', padding: '3px 10px', marginTop: 15, marginBottom: 'auto' }}
                title="Thêm trang web"
                class="btn btn-primary btn-circle btn-sm"
                onClick={(e) => setShowAdd(!showAdd)}
              >
                +
              </button>
            </Row>
            {showAdd && (
              <Row>
                <Col md="12">
                  <Card>
                    {/* <Card.Header>
                <Card.Title as="h4">Thêm trang web</Card.Title>
              </Card.Header> */}
                    <Card.Body>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Tên miền của bạn</span>
                        <Form>
                          <Row>
                            <Col md="6">
                              <div className="form-group">
                                <input
                                  className="form-control url"
                                  placeholder="Website URL (e.g.. yourdomain.com)"
                                  value={url}
                                  onChange={(e) => setUrl(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col md="6">
                              <div class="form-group">
                                <input
                                  className="form-control url"
                                  placeholder="Website name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                      <div>
                        <Button onClick={handleAddtarget} className="btn-fill pull-right verify-website" type="submit" variant="info">
                          THÊM TRANG WEB
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Địa chỉ URL</th>
                    <th>Thời gian tạo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listTargets &&
                    listTargets.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.address}</td>
                          <td>{item.name}</td>
                          <td>{item.created_at}</td>
                          <td>
                            <Row>
                              <p onClick={(e) => getId(item.id)} className="feather icon-edit text-success f-15 m-r-5"
                               title="Chỉnh sửa"
                               style={{ cursor: 'pointer' }}></p>
                              <Link
                                title="Chi riết rà soát"
                                to={`/scan/vulnerability/result?target_id=${item.id}`}
                                className="feather icon-info text-primary f-15 m-r-5"
                              ></Link>
                              <p  className="feather icon-trash text-danger f-15 m-r-5"
                               title="Xóa"
                               style={{ cursor: 'pointer' }}></p>
                            </Row>
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

export default Website;
