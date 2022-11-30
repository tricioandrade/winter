import React from "react";
import {SaleFormPaymentCondition, SaleFormPaymentWay} from "../components/SaleFormPayment";
import {SaleFormProducts} from "../components/SaleFormProducts";
import {SaleTable} from "./SaleTable";
import {SaleFormAccount} from "../components/SaleFormAccount";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import '../../css/Sales.css';
import {Link} from "react-router-dom";
const SaleTemplate = () => {
    return (
        <Container id="sale-component" className="animation">
            <div className="row col-12 mb-5">
                <div className="page-title">
                    <div className="col-12 m-auto title-section">
                        <Link to="#" className="border-0 text-decoration-none" aria-current="page">
                            <i className="fa fa-cash-register"/>&nbsp;Vendas</Link>
                    </div>
                </div>
            </div>
            <Row className="col-12 m-auto pt-0 mt-0" id='sale-content'>
                <Col lg={9} className="card shadow rounded pt-0 m-auto mt-0" style={{height: '70vh'}}>
                    <Card.Body>
                        <Row>
                            <Col lg={3}>
                                <SaleFormPaymentCondition/>
                                <SaleFormPaymentWay/>
                                <hr/>
                                <SaleFormProducts/>
                            </Col>
                            <Col lg={9} className="table-div" style={{height: '68vh', overflow: 'auto'}}>
                                <SaleTable/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
                <Col lg={3} className="pl-1 float-end">
                    <Col lg={12} className="card shadow rounded ">
                        <Card.Body>
                            <Col lg={12}>
                                <SaleFormAccount/>
                            </Col>
                            <Col className='mt-1'>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="invoiceReceiptBtn" type="button" className="btn btn-primary">Imprimir FacturaRecibo</Button>
                                </Col>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="saleMoneyBtn" type="button" className="btn btn-primary">Imprimir Venda àDinheiro</Button>
                                </Col>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="creditNoteBtn" type="button" className="btn btn-primary">Imprimir Nota de Crédito</Button>
                                </Col>
                            </Col>
                        </Card.Body>
                        <Card.Footer>
                            <Col lg={12}>
                                <Button
                                    id="printAgain"
                                    type="button"
                                    className="btn bg-success btn-primary">Imprimir novamente</Button>
                            </Col>
                        </Card.Footer>

                    </Col>
                </Col>
            </Row>
        </Container>
    );
}

export default SaleTemplate;
