import React from "react";
import {Card, Col, Form, FormLabel} from "react-bootstrap";

export const  SaleFormPaymentCondition =  () => {

    return  (
        <Col lg={12} className="m-1 p-2">
            <Card className="p-2 shadow rounded">
                <Form id="payment_ways" className="form-venda-de-produtos">
                    <Col lg={12}>
                        <FormLabel htmlFor="payment_mechanism">Condições de pagamento</FormLabel>
                        <Form.Select id="payment_mechanism">
                            <option selected>Pronto pagamento</option>
                        </Form.Select>
                    </Col>
                </Form>
            </Card>
        </Col>
    )
};

export const SaleFormPaymentWay = () => {

    return  (
        <Col lg={12} className="m-1 p-2">
            <Card className="p-2 shadow rounded">
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
            </Card>
        </Col>
    );
}
