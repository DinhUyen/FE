import React, { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Table, Button, Form, Pagination } from 'react-bootstrap';
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { StopIcon, InfoIcon, DeleteIcon } from "../../components/Icon/Icon";
const List_report_templates = () => {
  const [listReports, setlistReports] = useState([]);
  const [id, setId] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get("/reports/templates");
      console.log(res);
      setlistReports((listReports) => [...res.data.Items]);
    }
    getItem();
  }, []);
  const paginate = (reports) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return reports.slice(startIndex, endIndex);
  };

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
                {paginate(listReports).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.file}</td>
                          <td>{item.id}</td>
                          <td>{item.enable}</td>
                          <td>{item.id}</td>
                          <td>
                            <Link to="#" className="feather icon-edit text-warning f-15 m-r-5"></Link>
                            <Link to="#" className="feather icon-download text-danger f-15 m-r-5"></Link>
                            <Link to="#" className="feather icon-delete text-danger f-15 m-r-5"></Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Pagination>
                  {currentPage > 1 && (
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
                  )}
                  {currentPage > 2 && (
                    <Pagination.Ellipsis
                      onClick={() => setCurrentPage(Math.floor(currentPage / 2))}
                    />
                  )}
                  {[...Array(Math.ceil(listReports.length / pageSize)).keys()].map(
                    (number) =>
                      Math.abs(currentPage - (number + 1)) <= 2 && (
                        <Pagination.Item
                          key={number}
                          active={currentPage === number + 1}
                          onClick={() => setCurrentPage(number + 1)}
                        >
                          {number + 1}
                        </Pagination.Item>
                      )
                  )}
                  {currentPage <
                    Math.ceil(listReports.length / pageSize) - 1 && (
                      <Pagination.Ellipsis
                        onClick={() =>
                          setCurrentPage(
                            Math.ceil(
                              (currentPage +
                                Math.ceil(listReports.length / pageSize)) /
                              2
                            )
                          )
                        }
                      />
                    )}
                  {currentPage <
                    Math.ceil(listReports.length / pageSize) && (
                      <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
                    )}
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default List_report_templates;
//