import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const HomeTemplate = () => {

    return (
        <section id="sidebar">
            <Container>
                <Row>
                    <Col lg={2}>
                        <ul className='list-group'>
                            <li className='row d-flex flex-row list-group-item'>
                                <Col lg={1} className="icon text-center"><i className="fa fa-home"></i></Col>
                                <Col lg={4}>
                                    <Link to='/home' className=''>    
                                        <div className='title li'>Home</div>
                                    </Link>
                                </Col>
                            </li>       
                            <li className='row d-flex flex-row list-group-item'>
                                <Col lg={1} className="icon text-center"><i className="fa fa-cash-register"></i></Col>
                                <Col lg={4}>
                                    <Link to='/sale' className=''>    
                                        <div className='title'>Vendas</div>
                                    </Link>
                                </Col>
                            </li>
                            <li className='row d-flex flex-row list-group-item'>
                                <Col lg={1} className="icon text-center"><i className="fa fa-receipt"></i></Col>
                                <Col lg={4}>
                                    <Link to='/inventory' className='li-12'>    
                                        <div className='title li'>Inventário</div>
                                    </Link>
                                </Col>
                            </li>
                            <li className='row d-flex flex-row list-group-item'>
                                <Col lg={1} className="icon text-center"><i className="fa fa-file-invoice"></i></Col>
                                <Col lg={4}>
                                    <Link to='/receipt' className='li-12'>    
                                        <div className='title li'>Relatórios</div>
                                    </Link>
                                </Col>
                            </li>
                            <li className='row d-flex flex-row list-group-item'>
                                <Col lg={1} className="icon text-center"><i className="fa fa-user"></i></Col>
                                <Col lg={4}>
                                    <Link to='/user' className='li-12'>    
                                        <div className='title li'>Usuários</div>
                                    </Link>
                                </Col>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={10} className="row">
                        <Col lg={6}>
                            <div id="clock"></div>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomeTemplate;