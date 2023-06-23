import React from "react";
import {Col, Form, FormControl, FormLabel} from "react-bootstrap";


export const SaleFormAccount = () => {
    return (
        <Col id="account-footer">
            <Form>
                <Col lg={12} className="">
                    <FormLabel htmlFor="total">Total Líquido</FormLabel>
                    <FormControl
                        type="number" disabled
                        className="border-0 bg-transparent text-end rounded-0"
                        placeholder="0.00" id="totalValue"/>
                </Col>
                <Col>
                    <FormLabel htmlFor="paidValue">Valor pago</FormLabel>
                    <FormControl
                        id="paidValue"
                        type="number"
                        step="0,1"
                        className="text-end rounded-0"
                        placeholder="0,00"
                          />
                </Col>
                <Col>
                    <FormLabel htmlFor="change">Troco</FormLabel>
                    <FormControl type="number" className="form-control text-end rounded-0 border-0" placeholder="0,00" id="change"
                           disabled/>
                </Col>
            </Form>
        </Col>
);
}

