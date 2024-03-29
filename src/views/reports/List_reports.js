//      admin@vul.hunter
//      P@$$w0rd!@#$%^&*()
import React, { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Table, Button, Form, Pagination } from 'react-bootstrap';
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { StopIcon, InfoIcon, DeleteIcon, EditIcon, DownloadIcon } from "../../components/Icon/Icon";

const List_reports = () => {
  const [listReports, setlistReports] = useState([]);
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [state, setPublic] = useState()
  const [file, setFile] = useState()
  const [user_id, setUserid] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get("/reports/manager");
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

  const handleAddreport = (e) => {
    e.preventDefault()
    const data = {
      file: file,
      public: state,
      user_id: user_id,
      name: name
    }
    axiosClient.put(`reports/${id}`, data).then(res => {
      // handle response data here
    })
  }
  const Updatereport = (filename) => {
    const payload = {
      file: filename,
      public: true, // giá trị public mới
      user_id: user_id, // giá trị user_id mới
      name: name // giá trị name mới
    }
    axiosClient.put(`/reports/${filename}`, payload)
      .then(res => {
        console.log(res.data);
        // Cập nhật lại danh sách báo cáo sau khi update thành công
        const updatedReports = listReports.map(report => {
          if (report.filename === filename) {
            return {
              ...report,
              public: payload.public,
              user_id: payload.user_id,
              name: payload.name
            }
          }
          return report;
        });
        setlistReports(updatedReports);
      })
      .catch(err => console.error(err));
  }
  async function Deletereport(id) {
    console.log(id)
    const res = await axiosClient.delete("/reports/manager", {
      headers: {
        "Content-Type": 'application/json'
      }, data: {
        timestamp: id
      }
    })
    console.log(res.request)
    if (res.status == 200) {
      alert("Xóa thành công");
    }
  }
  const Downloadreport = (filename) => {
    axiosClient.get(`reports/manager/${filename}`).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    })
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">DANH SÁCH BÁO CÁO</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TÊN FILE REPORT</th>
                    <th>THỜI GIAN TẠO</th>
                    <th>TRẠNG THÁI</th>
                    <th>NGƯỜI TẠO</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(listReports).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.date_create}</td>
                        <td>{item.public}</td>
                        <td>{item.user_id}</td>
                        <td>
                          <td>
                            <span onClick={(e) => Updatereport(item.file)} className="feather icon-edit text-warning f-15 m-r-5"></span>
                            <span onClick={(e) => Downloadreport(item.file)} className="feather icon-download text-danger f-15 m-r-5"></span>
                            <span onClick={(e) => Deletereport(item.file)} className="feather icon-delete text-danger f-15 m-r-5"></span>
                          </td>
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

export default List_reports;
//


