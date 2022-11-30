import React from "react";
import {SaleFormCreditNote} from "../components/SaleFormCreditNote";
import {SaleFormPaymentCondition, SaleFormPaymentWay} from "../components/SaleFormPayment";
import {SaleFormProducts} from "../components/SaleFormProducts";
import {SaleTable} from "./SaleTable";
import {SaleFormAccount} from "../components/SaleFormAccount";
import {Col, Container, Row} from "react-bootstrap";

export const saleTemplate = (
    <Container id="sales-css" className="animation">
        <Row>
            <h4><i className="fa fa-cash-register"/>&nbsp;Vendas</h4>
            <hr/>
        </Row>
        <Row>
            <Col lg={3}>
                <SaleFormCreditNote />
                <SaleFormPaymentCondition />
                <SaleFormPaymentWay/>
                <SaleFormProducts />
            </Col>
            <Row className="col-9">
                <Col lg={12} className="card p-2 shadow rounded m-1  p-2" style={{height: '70vh'}}>
                    <div className="table-div"  style={{height: '68vh', overflow: 'auto'}}>
                        <SaleTable/>
                    </div>
                    <SaleFormAccount />
                </Col>
                <Col lg={4} id="btn-section">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button id="printAgain" type="button" className="btn btn-primary">Imprimir novamente</button>
                    </div>
                </Col>
                <Col id="btn-section" className="row text-end p-0">
                    <button id="FR" type="button" className="btn col float-end btn-primary">Imprimir Factura Recibo</button>
                    <button id="VD" type="button" className="btn col float-end btn-primary">Imprimir Venda à Dinheiro</button>
                    <button id="NC" type="button" className="btn col float-end btn-primary">Imprimir Nota de Crédito</button>
                </Col>
            </Row>
        </Row>
    </Container>
);


