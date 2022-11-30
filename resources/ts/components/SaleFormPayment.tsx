import React from "react";
import {Col, Form, FormLabel} from "react-bootstrap";

export const  SaleFormPaymentCondition =  () => {

    return  (
        <Col lg={12} className="">
            <Form id="payment_ways" className="form-venda-de-produtos">
                <Col lg={12}>
                    <FormLabel htmlFor="payment_mechanism">Condições de pagamento</FormLabel>
                    <Form.Select id="payment_mechanism">
                        <option selected>Pronto pagamento</option>
                    </Form.Select>
                </Col>
            </Form>
        </Col>
    )
};

export const SaleFormPaymentWay = () => {

    return  (
        <Col>
            <Form>
                <div className="col-12">
                    <FormLabel htmlFor="payment-ways">Meios de Pagamento</FormLabel>
                    <Form.Select id="payment-ways">
                        <option value="NU" selected>Numerário</option>
                        <option value="CC">Cartão de Crédito</option>
                        <option value="CB">Cheque Bancário</option>
                        <option value="OU">Outros Meios</option>
                    </Form.Select>
                </div>
            </Form>
        </Col>
    );
}
