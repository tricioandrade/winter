import React from 'react';
import {Button, Card, Col, Form, FormControl, FormLabel} from "react-bootstrap";



export const SaleFormProducts = () => {

    return (
        <Col lg={12}>
            <Card className="p-2 shadow rounded m-1  p-2">
                <Form id="sale-form-product" className="row g-3">
                    <Col lg={12}>
                        <FormLabel htmlFor="product-input">Produto ou Serviço</FormLabel>
                        <FormControl list="productList" id="productInput"
                               placeholder="Busque por produto..."/>
                        <datalist id="productList"></datalist>
                    </Col>
                    <Col lg={12}>
                        <FormLabel htmlFor="quantity">Quantidade</FormLabel>
                        <FormControl type="number" min="1" value="1" id="quantity"
                               placeholder="Quantidade" />
                    </Col>
                    <Col lg={12}>
                        <FormLabel htmlFor="discount" className="form-label">Desconto</FormLabel>
                        <FormControl type="number" value="0" name="dicount" id="discount" required />
                    </Col>
                    <Col lg={12}>
                        <Button type="submit" className="btn btn-primary mb-3">Adicionar</Button>
                    </Col>
                </Form>
            </Card>
        </Col>
    )
}
