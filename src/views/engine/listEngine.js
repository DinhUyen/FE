import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
  SplitButton,
  Table,
  InputGroup,
  FormControl,
  Form,
  Modal,
  Collapse
} from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import { Combobox } from 'react-widgets';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../../axiosClient';

const ListEngine = () => {
  const [show, setShow] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [listEngine, setListEngine] = useState([]);
  const [selects, setSelects] = useState('0');
  const [info, setInfo] = useState('');
  const [isBasic, setIsBasic] = useState(false);
  const [name, setName] = useState('');

  const [config, setConfig] = useState();
  useEffect(() => {
    async function getList() {
      let data = await axiosClient.get('/engines/manager');
      console.log(data.data);
      setListEngine(data.data);
    }
    getList();
  }, []);
  function getEngine(name, listEngine) {
    console.log(name);
    let data = listEngine.filter((e) => e.name === name);
    console.log(data[0]);
    setInfo(data[0]);
    setShow(true);
  }
  function deleleEngine(name) {
    console.log(name);
    //const res = await axiosClient.delete(`/engines/manager?name=${name}`);
  }
  async function downloadEngine(name) {
    console.log('hello');
    //const res = await axiosClient.get(`/engines/manager/${name}`);
    const res = await axiosClient.get(`/engines/manager/${name}`, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="filename.zip"',
        'Content-Length': 'filesize'
      },
      responseType: 'blob'
    });

    // create a temporary anchor element to download the blob
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}.zip`);
    document.body.appendChild(link);
    link.click();

    // release the URL object
    window.URL.revokeObjectURL(url);
  }

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    const data = { name: name };
    console.log(data);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axiosClient.post(`/engines/manager?name=${data.name}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload success:', res);
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setShowAdd(false);
  };
  async function editEngine() {
    const data = {
      name: name,
      config: config
    };
    console.log(data);
    const res = await axiosClient.put(`/engines/manager`, data);
  }
  const [enable, setEnable] = useState();
  async function editRoleEngine(name_engine, selects) {
    console.log(selects);
    const res = await axiosClient.put(`/engines/${name_engine}/enable?enable=${selects}`);
    console.log(res);
  }
  console.log(selects);
  return (
    <React.Fragment>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới engine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(event) => setName(event.target.value)} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>File</Form.Label>
                <Form.Control type="file" accept=".zip" onChange={handleFileChange} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Form>
            <Button onClick={handleSubmit}>Upload</Button>
          </Form>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật engine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={info.name} onChange={(event) => setName(event.target.value)} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Config</Form.Label>
                <Form.Control type="text" onChange={(event) => setConfig(event.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editEngine(info.name);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={info.name} />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Author</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={info.author} />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Describe</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={info.describe} />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Info</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={info.name} />
            <Row>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">Info</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={info.name} />
              </InputGroup>
            </Row>
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Permission</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={info.permission} />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary">Khôi phục</Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col sm={6}>
          <ul class="breadcrumb  ">
            <li class="breadcrumb-item  ">
              <a href="/demos/admin-templates/datta-able/react/free/">
                <a href="/demos/admin-templates/datta-able/react/free/basic/button">DANH SÁCH ENGINE</a>
              </a>
            </li>
            <li class="breadcrumb-item  ">
              <a href="/demos/admin-templates/datta-able/react/free/basic/button">Quản lý Engine</a>
            </li>
            <li class="breadcrumb-item  ">
              <a href="/demos/admin-templates/datta-able/react/free/basic/button">Danh sách engine</a>
            </li>
          </ul>
        </Col>
        <Col sm={6}>
          <Button
            style={{ float: 'right' }}
            onClick={() => {
              setShowAdd(true);
            }}
          >
            Thêm mới engine
          </Button>
        </Col>
      </Row>
      <Row className="btn-page">
        <Col sm={12}>
          {listEngine &&
            listEngine.map((item, index) => {
              return (
                <Card key={item.id}>
                  <Row>
                    <Col sm={2}>
                      <Row style={{ marginLeft: '25%' }}>
                        <div class="container-fuild">
                          <img class="acunetix" style={{ width: '60%' }} src={item.icon} alt="acunetix" />
                        </div>
                      </Row>
                    </Col>
                    <Col sm={8}>
                      <div>
                        <Col sm={3}>
                          <Row style={{ marginLeft: '10%' }}>
                            <Form.Group>
                              <h5>{item.name}</h5>
                              <label>{item.author}</label>
                              <div>
                                <select
                                  onChange={(e) => {
                                    setSelects(e.target.value);
                                  }}
                                  onClick={() => {
                                    editRoleEngine(item.name, selects);
                                  }}
                                  value={selects}
                                >
                                  <option value="0">Vô hiệu hóa</option>
                                  <option value="1">Admin</option>
                                  <option value="2">User</option>
                                  <option value="3">Full</option>
                                </select>
                              </div>
                              <br></br>
                              <h6>{item.describe}</h6>
                            </Form.Group>
                          </Row>
                        </Col>
                      </div>
                    </Col>

                    <Col sm={2}>
                      <Row style={{ marginLeft: '-50%' }}>
                        <Col>
                          <Link to="#" className="feather icon-toggle-right text-primary f-30 m-r-5"></Link>
                          <Link
                            to="#"
                            className="feather icon-info text-warprimaryning f-30 m-r-5"
                            onClick={(e) => getEngine(item.name, listEngine)}
                          ></Link>
                          <Link to="#" className="feather icon-settings text-primary f-30 m-r-5"></Link>
                        </Col>
                      </Row>

                      <br />
                      <Row style={{ marginLeft: '-50%' }}>
                        <Col>
                          <Link
                            to="#"
                            className="feather icon-edit text-primary f-30 m-r-5"
                            onClick={() => {
                              setShowEdit(true);
                            }}
                          ></Link>
                          <Link
                            to="#"
                            className="feather icon-download text-primary f-30 m-r-5"
                            onClick={() => {
                              downloadEngine(item.name);
                            }}
                          ></Link>
                          <Link to="#" className="feather icon-trash text-primary f-30 m-r-5" onClick={deleleEngine(item.name)}></Link>
                        </Col>
                      </Row>
                      <br />
                      <Row style={{ marginLeft: '-40%' }}>
                        <Col>
                          <Button className="btn btn-info" style={{ marginLeft: '-15%' }}>
                            <Link to="#" className="feather icon-shopping-cart text-warning f-30 m-r-5"></Link>
                            Danh sách module
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              );
            })}
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default ListEngine;
