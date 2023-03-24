import React from 'react';
import { Row, Col, Card, Tab, Tabs, Table } from 'react-bootstrap';
import CircleChart from './chart/chartCircle';
import ChartLine from './chart/chartLine';
import axiosClient from '../../axiosClient';
const DashDefault = () => {
  const [statistics, setStatistics] = React.useState({ total: {}, vul: {}, his: {} })

  React.useEffect(() => {
    async function fetchStatistics() {
      const responseTotal = await axiosClient.get('/statistics/total')
      const responseVul = await axiosClient.get('/statistics/total/vulnerability')
      const responseHis = await axiosClient.get('/statistics/scan/history')

      setStatistics({
        total: responseTotal.data,
        vul: responseVul.data,
        his: responseHis.data
      })
      console.log(statistics.total);
    }
    fetchStatistics()

  }, [])

  console.log({ statistics });
  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={2}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Tổng số engine</h6>
              <div className="col-9 ">
                <h3 className="f-w-300 m-b-0 text-center">
                  {statistics.total.TotalEngine}
                </h3>
                <br></br>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={2}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Tổng số module</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 m-b-0 text-center">
                    {statistics.total.TotalModule}
                  </h3>
                  <br></br>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={2}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Tổng số mục tiêu</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 m-b-0 text-center">
                    {statistics.total.TotalTarget}
                  </h3>
                  <br></br>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={6}>
          <Card className="card-social">
            <Card.Body>
              <h6 className="mb-4">THỐNG KÊ LỖ HỔNG</h6>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-2">
                  <h6 className="text-center m-b-10">
                    <h6 >High</h6>
                    <p className="text-muted m-r-5">{statistics.vul.High}</p>
                  </h6>
                </div>
                <div className="col-2">
                  <h6 className="text-center  m-b-10">
                    <h6 >Medium</h6>
                    <p className="text-muted m-r-5">{statistics.vul.Medium}</p>
                  </h6>
                </div>
                <div className="col-2">
                  <h6 className="text-center m-b-10">
                    <h6 >Low</h6>
                    <p className="text-muted m-r-5">{statistics.vul.Low}</p>
                  </h6>
                </div>
                <div className="col-3">
                  <h6 className="text-center  m-b-10">
                    <h6 >Information</h6>
                    <p className="text-muted m-r-5">{statistics.vul.Information}</p>
                  </h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={8}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">TOP 10 MỤC TIÊU DÒ QUÉT</Card.Title>
            </Card.Header>
            <Card.Body className="box radialbox mt-4">
              <ChartLine data={statistics.his.Items} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} xl={4}>
          <Card className="card-social">
            <Card.Header>
              <Card.Title as="h5">SỐ LẦN DÒ QUÉT</Card.Title>
            </Card.Header>
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center card-active">
                <div className="box radialbox mt-4">
                  <CircleChart data={Math.round(100*statistics.total.TotalDone / statistics.total.TotalScan)} />
                </div>
              </div>

            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Đã quét:</span>{statistics.total.TotalDone}
                  </h6>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Tổng số:</span>{statistics.total.TotalScan}
                  </h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={3}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                {/* <div className="col-auto">
                  <i className="fab fa-twitter text-c-blue f-36" />
                </div> */}
                <div className="col text-center">
                  <h4>CVE-2022-23343</h4>
                  {/* <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5> */}
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  {/* <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>34,185
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-green"
                      role="progressbar"
                      style={{ width: '40%', height: '6px' }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div> */}
                </div>
                <div className="col-6">
                  {/* <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>800
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-blue"
                      role="progressbar"
                      style={{ width: '70%', height: '6px' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div> */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                {/* <div className="col-auto">
                  <i className="fab fa-twitter text-c-blue f-36" />
                </div> */}
                <div className="col text-center">
                  <h4>CVE-2022-41328</h4>
                  {/* <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5> */}
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  {/* <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>34,185
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-green"
                      role="progressbar"
                      style={{ width: '40%', height: '6px' }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div> */}
                </div>
                <div className="col-6">
                  {/* <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>800
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-blue"
                      role="progressbar"
                      style={{ width: '70%', height: '6px' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div> */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                {/* <div className="col-auto">
                  <i className="fab fa-twitter text-c-blue f-36" />
                </div> */}
                <div className="col text-center">
                  <h4>CVE-2023-23397</h4>
                  {/* <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5> */}
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  {/* <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>34,185
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-green"
                      role="progressbar"
                      style={{ width: '40%', height: '6px' }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div> */}
                </div>
                <div className="col-6">
                  {/* <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>800
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-blue"
                      role="progressbar"
                      style={{ width: '70%', height: '6px' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div> */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col text-center">
                  <h4>CVE-2023-42534</h4>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                </div>
                <div className="col-6">
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
