import React, { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Table, Button, Form} from 'react-bootstrap';
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const List_engine = () => {
  const [listTargets, setlistTargets] = useState([]);
  const [id,setId] = useState()
  useEffect(() => {
    async function getItem() {
      const res = await axiosClient.get("targets");
      console.log(res);
      setlistTargets((listTargets) => [...res.data.items]);
    }
    getItem();
  }, []);
  const [url,setUrl] = useState()
  const [name,setName] = useState()
  console.log(url,name);

   const handleAddtarget =(e)=>{
    e.preventDefault()
    const data = {address:url,
      name:name}
    axiosClient.put("targets", data).then(res=>{
      // console.log(res)
    })
   }

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   function getId(id){
    setShow(true)
    setId(id)
   }
   const UpdateTarget = async()=>{
    const target = await axiosClient.post("/targets",{
      name:name,
      address:url,
      id:id
    })
    
    setShow(false)
   }
   async function createScan(id){
    console.log(id)
    const res = await axiosClient.post("/scans",{
      target_id:id,
      config:""
    })
    console.log(res)
   }
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
      </Modal>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Danh sách đối tượng</Card.Title>
            </Card.Header>
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
                            <Button className="btn-table"
                            onClick={(e)=>createScan(item.id)}
                            type="button"
                             >
                              Bắt đầu quét
                            </Button>
                            <Button type="button" 
                              className="btn-table btn-left" 
                              onClick={(e)=>getId(item.id)}>
                              Chỉnh sửa
                            </Button>
                            <Link to={`scan/vulnerability?target_id=${item.id}`}> 
                              <Button type="button" 
                              className="btn-table btn-left" 
                              > 
                              Chi tiết
                              </Button>
                            </Link>
                             
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

export default List_engine;
