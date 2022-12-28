import React from 'react';
import {Button,Col, Form, FormControl, FormLabel} from "react-bootstrap";



export const SaleFormProducts = () => {

    return (
        <Col lg={12}>
            <Form id="sale-form-product">
                <Col lg={12}>
                    <FormLabel htmlFor="product-input">Produto ou Serviço</FormLabel>
                    <FormControl list="productList" id="productInput" placeholder="Selecione o produto..."/>
                    <datalist id="productList"></datalist>
                </Col>
                <Col lg={12}>
                    <FormLabel htmlFor="quantity">Quantidade</FormLabel>
                    <FormControl type="number" min="1"  id="quantity" placeholder='Quantidade a vender' />
                </Col>
                <Col lg={12}>
                    <FormLabel htmlFor="discount" className="form-label">Desconto</FormLabel>
                    <FormControl type="number" name="discount" id="discount" required placeholder='Total a descontar'/>
                </Col>
                <Button type="submit" className="btn btn-primary mt-3">Adicionar</Button>
            </Form>
        </Col>
    )
}
