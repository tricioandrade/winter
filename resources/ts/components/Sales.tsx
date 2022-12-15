import React, {FormEvent, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";
import '../../css/Sales.css';
import {Link} from "react-router-dom";
import {ProductResource} from "../interfaces/ProductResource";
import {loadProducts} from "../tasks/loadProducts";
import listOfProducts from "../templates/ListOfProducts";
import {queryProduct} from "../tasks/queryProduct";
import {OnSaleProduct} from "../interfaces/OnSaleProduct";
import {SoldProduct} from "../interfaces/SoldProduct";
import calculatorTask from "../tasks/CalculatorTask";
import {Product} from "../interfaces/Product";
import CalculatorTask from "../tasks/CalculatorTask";
import MessageBox from "../tasks/MessageBox";
// import {Product} from "../interfaces/Product";

const Sales = () => {

    const [sale, setSaleState] = useState(true)
    const [paymentWay, setPaymentWay] = useState<string>('');
    const [paymentMechanism, setPaymentMechanism] = useState<string>('')
    const [products, setProducts] = useState<ProductResource[]>([]);
    const [saleType, setSaleType] = useState<string>('');
    const [productForSale, setProductForSale] = useState<string>('');
    const [saleTotal, setSaleTotal] = useState({});

    const [soldProducts, setSoldProduct] = useState<
        Partial<SoldProduct[]> |
        Partial<Product[]> |
        Partial<ProductResource[]>>([]);

    const [invoice, setInvoice] = useState();

    function handleSubmit (evt: FormEvent)  {
        evt.preventDefault();
        const form = evt.target as HTMLFormElement;

        const productCode: string = form.productCode.value;
        let onSaleProduct: OnSaleProduct = {
            code: form.productCode.value,
            price_total: 0,
            on_sale_quantity: +form.quantity.value,
            discount: +form.discount.value
        }


        const product: ProductResource[] = queryProduct(productCode, products, 'code');

        if(onSaleProduct.on_sale_quantity > +product[0].attributes.stock_quantity){
            MessageBox.open('Não pode tentar vender uma quantidade maior que a existente em stock');
            return;
        }

        onSaleProduct.price_total = calculatorTask.calculateFinalPrice(
            product[0].attributes.price_with_tax,
            onSaleProduct.on_sale_quantity,
            onSaleProduct.discount
        );

        console.log(onSaleProduct);
        console.log(soldProducts);

        setSoldProduct(CalculatorTask.calculateProducts(soldProducts,
            {
                product_id: +product[0].id,
                product_type_symbol: product[0].relationships.productType.symbol,
                product_type_name: product[0].relationships.productType.name,
                sold_quantity: onSaleProduct.on_sale_quantity,
                discount: +onSaleProduct.discount,
                tax_type: product[0].relationships.tax.symbol,
                tax_total: +product[0].attributes.tax_total_added * onSaleProduct.on_sale_quantity,
                total: onSaleProduct.price_total,
                ...product[0].attributes
            }
        ));
        if (soldProducts.length > 1){
            setSaleTotal(CalculatorTask.calculateSumOfTotal(soldProducts));
        }else if(soldProducts.length){
            const data: any = soldProducts[0];
            setSaleTotal({tax_total: data.tax_total, total: data.total})
        }
    }


    useEffect(() => {

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

        console.log(saleTotal);

    }, [saleType, sale, saleTotal]);

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
                                            <Form.Select id="payment_mechanism" onChange={ (evt) => setPaymentMechanism(evt.target.value) }>
                                                <option>&nbsp;</option>
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
                                                <optgroup label={'Tipo de pagamento'}>
                                                    <option >&nbsp;</option>
                                                    <option value="NU">Numerário</option>
                                                    <option value="CC">Cartão de Crédito</option>
                                                    <option value="CB">Cheque Bancário</option>
                                                    <option value="OU">Outros Meios</option>
                                                </optgroup>
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
                                            <FormControl list="productList" id="productCode" placeholder="Selecione o produto..."/>
                                            <datalist id="productList">
                                                { listOfProducts(products, 'code') }
                                            </datalist>
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

                            {/*Sale Table*/}
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
                                        <tbody></tbody>
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
                            </Col>
                            <Col className='mt-1'>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="invoiceReceiptBtn" onClick = {
                                        () => setSaleType('invoiceReceiptBtn')
                                    } className="btn btn-primary">Imprimir FacturaRecibo</Button>
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

export default Sales;
