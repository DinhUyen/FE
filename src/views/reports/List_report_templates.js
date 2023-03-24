import React, { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { StopIcon, InfoIcon, DeleteIcon } from "../../components/Icon/Icon";
const List_report_templates = () => {
  const [listReports, setlistReports] = useState([]);
  const [id, setId] = useState()
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get("/reports/templates");
      console.log(res);
      setlistReports((listReports) => [...res.data.Items]);
    }
    getItem();
  }, []);
  const [url, setUrl] = useState()
  const [name, setName] = useState()
  console.log(url, name);

  const handleAddreport = (e) => {
    e.preventDefault()
    const data = {
      address: url,
      name: name
    }
    axiosClient.put("reports", data).then(res => {
    })
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function getId(id) {
    setShow(true)
    setId(id)
  }
  const Updatereport = async () => {
    const report = await axiosClient.post("/reports", {
      name: name,
      address: url,
      id: id
    })

    setShow(false)
  }

  return (
    <React.Fragment>
      {/* <Modal show={show} onHide={handleClose}>
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
                    onChange={e=>setUrl(e.report.value)}
                  />
                </div>
                <div class="form-group">
                  <input
                    className="form-control url"
                    placeholder="Website name"
                    value={name}
                    onChange={e=>setName(e.report.value)}
                  />
                </div>
           
              </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ Updatereport}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">DANH SÁCH MẪU BÁO CÁO</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TÊN MẪU REPORT</th>
                    <th>THỜI GIAN TẠO</th>
                    <th>TRẠNG THÁI</th>
                    <th>NGƯỜI TẠO</th>
                  </tr>
                </thead>
                <tbody>
                  {listReports &&
                    listReports.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.file}</td>
                          <td>{item.id}</td>
                          <td>{item.enable}</td>
                          <td>{item.id}</td>
                          <td>
                            {/* <Button className="btn-table"
                            onClick={(e)=>createScan(item.id)}
                            type="button"
                             >
                              Bắt đầu quét
                            </Button> */}
                            {/* <Button type="button"
                              className="btn-table btn-left"
                            // onClick={(e)=>getId(item.id)}
                            >
                              Chỉnh sửa
                              </Button>
                            <Button type="button"
                              className="btn-table btn-left"
                            >
                              Chi tiết
                            </Button> */}
                            <Link to="#" className="feather icon-edit text-warning f-15 m-r-5"></Link>
                            <Link to="#" className="feather icon-download text-danger f-15 m-r-5"></Link>
                            <Link to="#" className="feather icon-delete text-danger f-15 m-r-5"></Link>
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

export default List_report_templates;