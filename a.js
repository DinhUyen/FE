import React from 'react';
import { Row, Col, Card, Tab, Tabs, Table } from 'react-bootstrap';
import CircleChart from './chart/chartCircle';
import ChartLine from './chart/chartLine';
import axiosClient from '../../axiosClient';

const DashDefault = () => {
    const [statistics, setStatistics] = React.useState({ total: {}, vul: {}, his: {}, listcve: {} })

    React.useEffect(() => {
        async function fetchStatistics() {
            const responseTotal = await axiosClient.get('/statistics/total')
            const responseVul = await axiosClient.get('/statistics/total/vulnerability')
            const responseHis = await axiosClient.get('/statistics/scan/history')
            const responseListCVE = await axiosClient.get('cvetrends_ns/cvetrends')
            setStatistics({
                total: responseTotal.data,
                vul: responseVul.data,
                his: responseHis.data,
                listcve: responseListCVE.data
            })
            console.log(statistics.total);
        }
        fetchStatistics()

    }, [])

    console.log({ statistics });
    return (
        <React.Fragment>
            <Row>
                {statistics.listcve && statistics.listcve.data && statistics.listcve.data.map(item => (
                    <Col md={6} xl={4}>
                        <Card className="card-social">
                            <Card.Body className="border-bottom">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col text-center">
                                        <h4>{item.cve}</h4>
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
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="my-auto media-body">
                                                <h4 class="font-weight-bolder mb-0">{statistics.listcve.data.num_tweets}</h4>
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
                                                <h4 class="font-weight-bolder mb-0">{statistics.listcve.data.num_retweets}</h4>
                                                <p class="font-small-3 mb-0 card-text">Retweets</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <small class="text-muted">{statistics.listcve.data.publishedDate}</small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                )
                },
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;

