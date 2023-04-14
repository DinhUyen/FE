import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CircleChart from './chart/chartCircle';
import ChartLine from './chart/chartLine';
import axiosClient from '../../axiosClient';

const DashDefault = () => {
  const [statistics, setStatistics] = React.useState({ total: {}, vul: {}, his: {}, listcve: {} });
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    async function fetchStatistics() {
      const responseTotal = await axiosClient.get('/statistics/total')
      const responseVul = await axiosClient.get('/statistics/total/vulnerability')
      const responseHis = await axiosClient.get('/statistics/scan/history')
      const responseListCVE = await axiosClient.get('/cvetrends')
      setStatistics({
        total: responseTotal.data,
        vul: responseVul.data,
        his: responseHis.data,
        listcve: responseListCVE.data
      })
      // console.log(statistics);
    }
    fetchStatistics()

  }, [])
  function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = statistics.listcve?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const maxVisiblePages = 5;
  const pageNumbers = [];
  const totalPages = Math.ceil(statistics.listcve?.data?.length / itemsPerPage);
  const leftSide = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const rightSide = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

  range(leftSide, rightSide).forEach(number => {
    pageNumbers.push(number);
  });

  if (leftSide > 1) {
    pageNumbers.unshift('...');
    pageNumbers.unshift(1);
  }

  if (rightSide < totalPages) {
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

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
                  <CircleChart data={Math.round(100 * statistics.total.TotalDone / statistics.total.TotalScan)} />
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

        {currentItems &&
          currentItems.map((item) => (
            <Col key={item.cve} md={6} xl={4}>
              <Card className="card-social">
                <Card.Body className="border-bottom">
                  <div className="row align-items-center justify-content-center">

                    <div className="col text-center">
                      <h4> {item.cve}</h4>
                      <span class="mb-1 badge badge-light-secondary badge-pill">{item.severity}</span>
                    </div>
                  </div>
                </Card.Body>
                <Card.Body>
                  <div className="row align-items-center justify-content-center card-active">
                    <p class="card-text text-center">{item.description}</p>
                    <div class="d-flex justify-content-center row">
                      <div class=" text-lg-center p-1">
                        <a href={item.link_detail} target="_blank" class=" waves-effect btn btn-outline-danger btn-block">
                          Details</a>
                      </div>
                      <div class="text-lg-center p-1">
                        <a href={item.link_poc} target="_blank" class=" waves-effect btn btn-outline-success btn-block">
                          PoC</a>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Body>
                  <div class="card-footer">
                    <div class="row">
                      <div class="mx-auto media">
                        <div class="avatar mr-1 bg-light-success">
                          <span class="avatar-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                            </svg>
                          </span>
                        </div>
                        <div class="my-auto media-body">
                          <h4 class="font-weight-bolder mb-0">{item.audience_size}</h4>
                          <p class="font-small-3 mb-0 card-text">Audience</p>
                        </div>
                      </div>
                      <div class="mx-auto media">
                        <div class="avatar mr-1 bg-light-info">
                          <span class="avatar-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                          </span>
                        </div>
                        <div class="my-auto media-body">
                          <h4 class="font-weight-bolder mb-0">{item.num_tweets}</h4>
                          <p class="font-small-3 mb-0 card-text">Tweets</p>
                        </div>
                      </div>
                      <div class="mx-auto media">
                        <div class="avatar mr-1 bg-light-primary">
                          <span class="avatar-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                            </svg>
                          </span>
                        </div>
                        <div class="my-auto media-body">
                          <h4 class="font-weight-bolder mb-0">{item.num_retweets}</h4>
                          <p class="font-small-3 mb-0 card-text">Retweets</p>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <small class="text-muted">{item.publishedDate}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <div className="d-flex justify-content-center">
        <ul className="pagination">
          {pageNumbers.map((number, index) => (
            <li
              key={index}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
                disabled={number === "..."}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </React.Fragment >
  );
};

export default DashDefault;
