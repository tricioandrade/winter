import React from "react";
import {Col, Form, FormControl, FormLabel, Row} from "react-bootstrap";


export const SaleFormAccount = () => {
    return (
        <div className="col-12" id="account-footer">
            <div className="col-12 pt-0 m-0">

                <Row>
                    <Form className="p-4 pt-0 pb-0">
                        <Col lg={12} className="p-0 text-end">
                            <FormLabel htmlFor="total">Total</FormLabel>
                            <FormControl type="number" disabled
                                         className="border-0 bg-transparent text-end rounded-0"
                                   placeholder="0.00" id="totalValue"/>
                        </Col>
                        <Col lg={6} className="p-0 text-end">
                            <FormLabel htmlFor="paidValue">Valor pago</FormLabel>
                            <FormControl type="number" step="0,1" className="text-end rounded-0" placeholder="0,00"
                                   id="paidValue"/>
                        </Col>
                        <div className="col-6 p-0 text-end">
                            <FormLabel htmlFor="change">Troco</FormLabel>
                            <FormControl type="number" className="form-control text-end rounded-0 border-0" placeholder="0,00" id="change"
                                   disabled/>
                        </div>
                    </Form>
                </Row>
            </div>
        </div>
);
}

