import React, {FormEvent, useEffect, useState} from "react";
import {ProductResource} from "../../interfaces/ProductResource";
import {SoldProduct} from "../../interfaces/SoldProduct";
import {OnSaleProduct} from "../../interfaces/OnSaleProduct";
import {queryProduct} from "../../tasks/queryProduct";
import MessageBox from "../../tasks/MessageBox";
import calculatorTask from "../../tasks/CalculatorTask";
import CalculatorTask from "../../tasks/CalculatorTask";
import {loadProducts} from "../../tasks/loadProducts";
import {Button, Card, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import listOfProducts from "../../templates/ListOfProducts";
import rowsOfProducts from "../../templates/rowsOfProducts";
import {DocTypes} from "../../enums/DocTypes";
import {Invoice} from "../../interfaces/Invoice";
import {ProductType} from "../../interfaces/ProductType";

const Sales = () => {

    const [sale,                setSaleState]        = useState(true)
    const [paymentWay,          setPaymentWay]       = useState<string>('');
    const [paymentCondition,    setPaymentCondition] = useState<string>('')
    const [products,            setProducts]         = useState<ProductResource[]>([]);
    const [saleType,            setSaleType]         = useState<number>(0);
    const [productArrayKey,     setProductArrayKey]  = useState<number>(-1);
    const [change,              setChange]           = useState<number>(0);
    const [saleTotal,           setSaleTotal]        = useState<{service_total: number, tax_total: number, total: number}>({
        service_total: 0,
        tax_total: 0,
        total:0
    });
    const [soldProducts,        setSoldProduct]      = useState<SoldProduct[]>([]);
    const [payment,             setPayment]          = useState<number>(0);
    const [invoice,             setInvoice]          = useState<Invoice>();
    const [customer,            setCustomer]         = useState<string>('');

    /*
     * Handling form product submission
     * */
    const handleSubmit = (evt: FormEvent) => {

        evt.preventDefault();
        const form = evt.target as HTMLFormElement;
        const productCode: string = form.productCode.value;
        form.productCode.value = '';

        /*
        * Inserting the product values from user
        * */
        let onSaleProduct: OnSaleProduct = {
            code: productCode,
            price_total: 0,
            on_sale_quantity: +form.quantity.value,
            discount: +form.discount.value
        }

        /*
        * Querying the product from requested data.
        * */
        const product: ProductResource[] = queryProduct(productCode, products, 'code');

        /*
        * Verifying if the quantity to be sold is grater than stock quantity
        * */
        if(onSaleProduct.on_sale_quantity > +product[0].attributes.stock_quantity){
            MessageBox.open('Não pode tentar vender uma quantidade maior que a existente em stock');
            return;
        }

        /*
        * @OnSaleProduct is the current product, here is getting the total cost
        * */
        onSaleProduct.price_total = calculatorTask.calculateFinalPrice(
            product[0].attributes.price_with_tax,
            onSaleProduct.on_sale_quantity,
            onSaleProduct.discount
        );

        /**
         * Setting product to be sold into a store variable
         * */
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

        /*
        * Generating the total of sale
        * */
        totalSaleGenerate(soldProducts);
    }

    /*
    * Calculate the total sold on current sale
    * */
    const totalSaleGenerate = (soldProducts: SoldProduct[]) => {
        if (soldProducts.length > 1)
            setSaleTotal(CalculatorTask.calculateSumOfTotal(soldProducts));
        else if(soldProducts.length === 1)
            setSaleTotal({
                service_total: (soldProducts[0].product_type_id === ProductType.S ? soldProducts[0].total : 0.00),
                tax_total: soldProducts[0].tax_total,
                total: soldProducts[0].total
            });
        else
            setSaleTotal({service_total: 0.00, tax_total: 0.00, total: 0.00});

        /*
        * Updating Sold Product
        * */
        setSoldProduct(soldProducts);
    }

    /*
    * Event to remove Product for current sale
    * */
    const handleSubmitOnTable = (evt: FormEvent) => {
        evt.preventDefault();
        const value = +((evt.target as HTMLElement).querySelector('button') as HTMLButtonElement).value;
        setProductArrayKey(value);
    }

    /*
    * Removing product
    * */
    const removeProduct = (soldProducts: any[], productArrayKey: number) => {
        if ((productArrayKey === 0) || (productArrayKey > 1)) {
            const index = products.findIndex((object: any) => {
                return object.product_id === productArrayKey;
            });
            soldProducts.splice(index, 1);
            setSoldProduct(soldProducts);
            totalSaleGenerate(soldProducts);
            setProductArrayKey(-1);
        }
    }


    /*
    * Generate Invoice
    * */
    function generateInvoice (docType: DocTypes) {

        const paymentInputVerify: () => boolean = (): boolean => !!(paymentCondition && paymentWay);

        const paymentType = (): boolean => {
            return !(paymentWay === 'NU' && saleTotal.total < change && payment < 0);
        };

        switch (docType) {
            case DocTypes.FR:
                if(!paymentInputVerify()) {
                    MessageBox.open('Insira correctamente as informações de pagamento ');
                    return;
                }
                if(!paymentType()){
                    MessageBox.open('Insira correctamente as informações de pagamento ');
                    return;
                }

                setInvoice({
                    currency: 'AOA',
                    exchange: 750,
                    customer: customer ?? 'Consumidor final',
                    paid_value: payment,
                    change: change,
                    payment_mechanism: paymentCondition,
                    payment_way: paymentWay,
                    invoice_type_id: docType,
                    merchandise_total: saleTotal.total,
                    commercial_discount: discount,
                    service_total: number;
                    tax_total: number;
                    total: number;
                });
                break;
            case 'saleMoneyBtn' :   break;
            case 'creditNoteBtn' : break;
        }
        setSaleType(0);
    }

    useEffect(() => {
        if (sale) {
            loadProducts(data => setProducts(data) , 'sale');
            setSaleState(false);
        }

        /*  Finishing sale after clicker button
        * */
        if(saleType) generateInvoice(saleType) ;

        removeProduct(soldProducts, productArrayKey);
    }, [productArrayKey, saleType, sale, saleTotal, soldProducts]);

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
            <Row className="col-12 m-auto pt-0 mt-0" >
                <Col id='sale-content' lg={9} className="card shadow rounded pt-0 m-auto mt-0" >
                    <Card.Body>
                        <Row>
                            <Col lg={3}>

                                {/*Form Payment Mechanism*/}
                                <Col lg={12} className="">
                                    <Form>
                                        <Col lg={12}>
                                            <FormLabel htmlFor="payment_mechanism">Condições de pagamento</FormLabel>
                                            <Form.Select id="payment_mechanism" onChange={ (evt) => setPaymentCondition(evt.target.value) }>
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
                                            <FormControl required list="productList" id="productCode" placeholder="Selecione o produto..."/>
                                            <datalist id="productList">
                                                { listOfProducts(products, 'code') }
                                            </datalist>
                                        </Col>
                                        <Col lg={12}>
                                            <FormLabel htmlFor="quantity">Quantidade</FormLabel>
                                            <FormControl type="number" defaultValue={1} min="1"  id="quantity" placeholder='Quantidade a vender' />
                                        </Col>
                                        <Col lg={12}>
                                            <FormLabel htmlFor="discount" className="form-label">Desconto</FormLabel>
                                            <FormControl type="number" defaultValue={0} name="discount" id="discount" required placeholder='Total a descontar'/>
                                        </Col>
                                        <Button type="submit" className="btn btn-primary mt-3">Adicionar</Button>
                                    </Form>
                                </Col>
                            </Col>

                            {/*Sale Table*/}
                            <Col lg={9} className={"table-div"} style={{ height: '65vh', overflow: 'auto' }}>
                                <table id="saleTable" className="table" onSubmit={ handleSubmitOnTable }>
                                    <thead>
                                    <tr>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Imposto</th>
                                        <th>Desconto</th>
                                        <th>Total</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { rowsOfProducts(soldProducts) }
                                    </tbody>
                                </table>
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
                                                value={parseFloat((saleTotal?.total).toString()).toFixed(2)}
                                                className="text-end "
                                                placeholder="0.00"/>
                                        </Col>
                                        <Col>
                                            <FormLabel htmlFor="paidValue">Valor pago</FormLabel>
                                            <FormControl
                                                id="paidValue"
                                                type="number"
                                                onChange={ (evt) => {
                                                    if (+evt.target.value >= +saleTotal?.total){
                                                        setChange(+evt.target.value - +saleTotal?.total);
                                                    }
                                                    setPayment(+evt.target.value);
                                                }}
                                                className="text-end "
                                                placeholder="0,00"
                                            />
                                        </Col>
                                        <Col>
                                            <FormLabel htmlFor="change">Troco</FormLabel>
                                            <FormControl
                                                type="number"
                                                className="text-end "
                                                placeholder="0,00"
                                                value={parseFloat((change.toString())).toFixed(2)}
                                                disabled/>
                                        </Col>
                                    </Form>
                                </Col>
                            </Col>
                            <Col className='mt-1'>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="invoiceReceiptBtn" onClick = {
                                        /* Invoice Receipt */
                                        () => setSaleType(DocTypes.FR)
                                    } className="btn btn-primary">Factura Recibo</Button>
                                </Col>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="saleMoneyBtn" onClick = {
                                        /* Sale Money */
                                        () => setSaleType(DocTypes.VD)
                                    } className="btn-primary">Venda à Dinheiro</Button>
                                </Col>
                                <Col lg={12} className="mt-3 mb-3">
                                    <Button id="creditNoteBtn" onClick = {
                                        /* Credit Note */
                                        () => setSaleType(DocTypes.NC)
                                    } className="btn-primary">Nota de Crédito</Button>
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
