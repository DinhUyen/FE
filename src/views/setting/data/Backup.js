import React, { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Table, Button, Form} from 'react-bootstrap';
import { useEffect } from "react";
import axiosClient from "../../../axiosClient";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import picture from "../../../assets/images/user/email.svg"
import decorationLeft from "../../../assets/images/user/decore-left.png"
import decorationRight from "../../../assets/images/user/decore-right.png"
import { Rectangle } from "../../../assets/block/rectangle";
import "./success.scss"
import {
  CardTitle,
  CardBody,
  CardText,

} from "reactstrap"
const Backup = () => {
  const [listFiles, setlistFiles] = useState([]);
  const [id,setId] = useState()
  const [idSuccess, setIdSuccess] = useState()
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get("/dbbackup/restore");
      // console.log(res.data.message);
      setlistFiles((listFiles) => [...res.data.message]);
    }
    getItem();
  }, []);
  const [url,setUrl] = useState()
  const [name,setName] = useState()
  console.log(url,name);

  //  const handleAddtarget =(e)=>{
  //   e.preventDefault()
  //   const data = {address:url,
  //     name:name}
  //   axiosClient.put("targets", data).then(res=>{
  //     // console.log(res)
  //   })
  //  }

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [showSuccess, setShowSuccess] = useState(false)
   const handleShowSuccess = () => setShowSuccess(true)
   function getId(id){
    setShow(true)
    setId(id)
   }
   const handleRestore =(e) =>{
    axiosClient.post("/dbbackup/backup").then(res=>{
      // console.log(res.data.message.substring(0,14))
      if (res.status == 200){
        setIdSuccess(res.data.message.substring(0,14))
        console.log(idSuccess)
        handleShowSuccess()
        setTimeout(()=>{
          setShowSuccess(false)
        }, 5000)
      }

    })
   }
   async function handleDeleteFile(id){
    console.log(id)
    const res = await axiosClient.delete("/dbbackup/restore",{headers: {
        "Content-Type": 'application/json'
    }, data: {
      timestamp: id
    }})
    console.log(res.request)
    if (res.status==200){
      alert("Xóa thành công");
      
    }
   }
   async function downloadFile(id){
    const res = await axiosClient.get(`/dbbackup/files?id=${id}`,{
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="filename.zip"',
        'Content-Length': 'filesize'
      },
      responseType: 'blob',
    })
  
    // create a temporary anchor element to download the blob
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${id}.zip`);
    document.body.appendChild(link);
    link.click();
  
    // release the URL object
    window.URL.revokeObjectURL(url);
   }
   async function uploadFile(id){
    const res = await axiosClient.get(`/dbbackup/files?id=${id}`,{
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="filename.zip"',
        'Content-Length': 'filesize'
      },
      responseType: 'blob',
    })
  
    // create a temporary anchor element to download the blob
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${id}.zip`);
    document.body.appendChild(link);
    link.click();
  
    // release the URL object
    window.URL.revokeObjectURL(url);
   }
   
   
  //  const UpdateTarget = async()=>{
  //   const target = await axiosClient.post("/targets",{
  //     name:name,
  //     address:url,
  //     id:id
  //   })
    
  //   setShow(false)
  //  }
  //  async function createScan(id){
  //   console.log(id)
  //   const res = await axiosClient.post("/scans",{
  //     target_id:id,
  //     config:""
  //   })
  //   console.log(res)
  //  }
  return (
    <React.Fragment>
      <Row>
        <Col md="12"></Col>
        <Col md="12" className="px-5">
          {/* <Card className="text-center mb-3"> */}
          <Card className=" text-center px-2 py-2">
           <Row>
           <Col md="6">
              <CardBody>
                <CardTitle tag="h3" className="text-primary">
                  BẠN ĐÃ SAO LƯU DỮ LIỆU CHƯA ?
                </CardTitle>
                <CardText>
                  Việc sao lưu cơ sở dữ liệu thường xuyên giúp bạn quản lý và
                  hạn chế các rủi ro trong quá trình vận hành hệ thống. Vì vậy
                  hãy đảm bảo cơ sở dữ liệu của bạn được sao lưu định kỳ nhé
                  👋👋👋
                </CardText>

                <Button color="primary" onClick={() => handleRestore()}>
                  Sao lưu
                </Button>
              </CardBody>
            </Col>
            <Col md="6">
            <img
              className="congratulation-medal"
              src={picture}
              alt="Medal Pic"
              height="200"
            />
            </Col>
           </Row>
          </Card>
        </Col>
        <Col md="2"></Col>
      </Row>
     {showSuccess &&  <Row>
        
        <Col md="12"></Col>
        <Col md="12" className="px-5">
          {/* <Card className="text-center mb-3"> */}
          <Card className="card-congratulations">
            <CardBody className="text-center">
              <img
                className="congratulations-img-left"
                src={decorationLeft}
                alt="decor-left"
              />
              <img
                className="congratulations-img-right"
                src={decorationRight}
                alt="decor-right"
              />
              <div className="text-center">
                <h1 className="mb-1 text-white">CHÚC MỪNG BẠN</h1>
                <CardText className="m-auto w-75">
                  Cơ sở dữ liệu đã được sao lưu thành công với mã id <span style={{color:"yellow"}}>{idSuccess}</span>
                </CardText>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="2"></Col>
      </Row>}
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
                    onChange={e=>setUrl(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input
                    className="form-control url"
                    placeholder="Website name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                  />
                </div>
           
              </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ UpdateTarget}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">DANH SÁCH FILE BACKUP</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên tệp</th>
                    <th>Kích thước</th>
                    <th>Ngày tạo</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td><p  onClick={(e)=>uploadFile()} className="feather icon-upload text-primary f-15 m-r-5"></p></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                {listFiles &&
                      listFiles.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td></td>
                            <td>{item.id}</td>
                            <td>{item.sizes}mb</td>
                            <td>{item.date}</td>
                            <td>
                            <Row>
                            <p  onClick={(e)=>downloadFile(item.id)} className="feather icon-download text-primary f-15 m-r-5"></p>
                            <p onClick={(e)=>handleDeleteFile(item.id)} className="feather icon-trash text-danger f-15 m-r-5"></p>
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

export default Backup;
