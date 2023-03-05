//tk:admin@vul.hunter:P@$$w0rd!@#$%^&*()
import React, { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { StopIcon, InfoIcon, DeleteIcon } from "../../components/Icon/Icon";

const List_reports = () => {
  const [listReports, setlistReports] = useState([]);
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [state, setPublic] = useState()
  const [file, setFile] = useState()
  const [user_id, setUserid] = useState()

  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get("/reports/manager");
      console.log(res);
      setlistReports((listReports) => [...res.data.Items]);
    }
    getItem();
  }, []);

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
  const Deletereport = async (filename) => {
    const report = await axiosClient.delete("/reports/manager", {
      data: filename,
    })
    .then(Response => {
      console.log(Response.data);
    })
    .catch(error => {
      console.log(error);
      });
  };
  // const Downloadreport = (filename) => {
  //   axiosClient.get(`/reports/manager/${filename}`, {name_file: filename})
  //     .then((res) => {
  //       // handle the response
  //     })
  //     .catch((error) => {
  //       // handle the error
  //     });
  // }
  const Downloadreport = (filename) => {
    const payload = { name_file: filename };
    axios({
      url: `reports/manager/${filename}`,
      method: 'GET',
      responseType: 'blob',
      data: payload,
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
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
                  {listReports &&
                    listReports.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.date_create}</td>
                          <td>{item.public}</td>
                          <td>{item.user_id}</td>
                          <td>
                            <td >
                              {/* <p onClick={} className="feather icon-info text-primary f-15 m-r-5"></p> */}
                              <span onClick={(e) => Updatereport(item.filename)} className="feather icon-edit text-warning f-15 m-r-5"></span>
                              <span onClick={(e) => Downloadreport(item.filename)} className="feather icon-download text-danger f-15 m-r-5"></span>
                              <span onClick={(e) => Deletereport(item.filename)} className="feather icon-delete text-danger f-15 m-r-5"></span>
                            </td>
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

export default List_reports;



