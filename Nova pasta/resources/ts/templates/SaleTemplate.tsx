import React, {FormEvent, useEffect, useState} from "react";
import {SaleFormAccount} from "../components/sale/SaleFormAccount";
import {Button, Card, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";
import '../../css/Sales.css';
import {Link} from "react-router-dom";
import {ProductResource} from "../interfaces/ProductResource";
import {loadProducts} from "../tasks/loadProducts";
const SaleTemplate = () => {

    const [sale, setSaleState] = useState(true)
    const [paymentWay, setPaymentWay] = useState<string>('');
    const [paymentMechanism, setPaymentMechanism] = useState<string>('')
    const [products, setProducts] = useState<ProductResource[]>([]);

    const [saleType, setSaleType] = useState<string>('');

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        const form = evt.target as HTMLFormElement;
        console.log(form);
    }

    const main = () => {

        if (sale) {
            loadProducts(data => setProducts(data) );
            setSaleState(false);
        }

        switch (saleType) {
            case 'invoiceReceiptBtn' :
                break;
            case 'saleMoneyBtn' :
                break;
            case 'creditNoteBtn' :
                break;
        }
    };

    useEffect(main, [saleType, sale]);

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

                                {/*Form Payment Mechanism*/}
                                <Col lg={12} className="">
                                    <Form>
                                        <Col lg={12}>
                                            <FormLabel htmlFor="payment_mechanism">Condições de pagamento</FormLabel>
                                            <Form.Select id="payment_mechanism" onChange={ setPaymentMechanism }>
                                                <option disabled>Forma de pagamento</option>
                                                <option>Pronto pagamento</option>
                                            </Form.Select>
                                        </Col>
                                    </Form>
                                </Col>

                                {/*Form Payment Ways*/}
                                <Col>
                                    <Form>
                                        <div className="col-12">
                                            <FormLabel htmlFor="payment_way">Meios de Pagamento</FormLabel>
                                            <Form.Select id="payment_way" onChange={
                                                (evt) => setPaymentWay(evt.target.value)
                                            }>
                                                <option disabled>Tipo de pagamento</option>
                                                <option value="NU">Numerário</option>
                                                <option value="CC">Cartão de Crédito</option>
                                                <option value="CB">Cheque Bancário</option>
                                                <option value="OU">Outros Meios</option>
                                            </Form.Select>
                                        </div>
                                    </Form>
                                </Col>
                                <hr/>

                                {/*Form Of Products*/}
                                <Col lg={12}>
                                    <Form id="sale-form-product" onSubmit={  handleSubmit }>
                                        <Col lg={12}>
                                            <FormLabel htmlFor="product-input">Produto ou Serviço</FormLabel>
                                            <FormControl list="productList" id="productInput" placeholder="Selecione o produto..."/>
                                            <datalist id="productList"/>
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
                            </Col>
                            {/**/}
                            <Col lg={9} className={"table-div"} style={{height: '68vh', overflow: 'auto'}}>
                                <Col>
                                    <table id="saleTable" className="table">
                                        <thead>
                                        <tr>
                                            <th>Descrição</th>
                                            <th>Preço</th>
                                            <th>Quantidade</th>
                                            <th>Imposto</th>
                                            <th>Desconto</th>
                                            <th>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody/>
                                    </table>
                                </Col>
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
                                    <Button id="invoiceReceiptBtn" onClick = {
                                        () => setSaleType('invoiceReceiptBtn')
                                    } type="button" className="btn btn-primary">Imprimir FacturaRecibo</Button>
                                </Col>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="saleMoneyBtn" onClick = {
                                        () => setSaleType('saleMoneyBtn')
                                    } className="btn-primary">Imprimir Venda à Dinheiro</Button>
                                </Col>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="creditNoteBtn" onClick = {
                                        () => setSaleType('creditNoteBtn')
                                    } className="btn-primary">Imprimir Nota de Crédito</Button>
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
