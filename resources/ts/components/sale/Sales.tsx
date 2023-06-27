import React, {FormEvent, useEffect, useState} from "react";
import {ProductResource} from "../../interfaces/ProductResource";
import {SoldProduct} from "../../interfaces/SoldProduct";
import {OnSaleProduct} from "../../interfaces/OnSaleProduct";
import {queryProduct} from "../../tasks/queryProduct";
import MessageBox from "../../tasks/MessageBox";
import calculatorTask from "../../tasks/CalculatorTask";
import CalculatorTask from "../../tasks/CalculatorTask";
import {loadProducts} from "../../tasks/loadProducts";
import {Button, ButtonGroup, Card, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import listOfProducts from "../../templates/ListOfProducts";
import rowsOfProducts from "../../templates/rowsOfProducts";
import {DocTypes} from "../../enums/DocTypes";
import {Invoice} from "../../interfaces/Invoice";
import {SaleTotal} from "../../interfaces/SaleTotal";
import {PaymentWays} from "../../enums/PaymentWays";
import SaleRequests from "../../requests/SaleRequests";
import Preloader from "../../tasks/Preloader";
import { SaleFormCreditNote } from "./SaleFormCreditNote";
import InvoicesRequests from "../../requests/InvoicesRequests";

const Sales = () => {

    const [sale,                setSaleState]        = useState(false)
    const [creditNoteState,     setCreditNoteState]  = useState(false)
    const [paymentWay,          setPaymentWay]       = useState<PaymentWays>(1);
    const [paymentCondition,    setPaymentCondition] = useState<string>('Pronto pagamento')
    const [products,            setProducts]         = useState<ProductResource[]>([]);
    const [saleType,            setSaleType]         = useState<number>(0);
    const [productArrayKey,     setProductArrayKey]  = useState<number>(-1);
    const [change,              setChange]           = useState<number>(0);
    const [saleTotal,           setSaleTotal]        = useState<SaleTotal>({
        commercial_discount: 0.00,
        merchandise_total: 0.00,
        service_total: 0.00,
        tax_total: 0.00,
        total:0.00
    });
    
    const [soldProducts,        setSoldProduct]      = useState<SoldProduct[]>([]);
    const [payment,             setPayment]          = useState<number>(0);
    const [discount,             setDiscount]        = useState<number>(0);
    const [customer,            setCustomer]         = useState<string>('Consumidor final');

    console.log(saleTotal);
    let saleData: {
        invoice: Invoice | undefined,
        soldProducts: SoldProduct[]
    };

    const clearSates = () => {
        setSaleState(true);
        setPaymentWay(1);
        setPaymentCondition('Pronto pagamento');
        setProducts([]);
        setSaleType(0);
        setProductArrayKey(-1);
        setChange(0);
        setSaleTotal({
            commercial_discount: 0.00,
            merchandise_total: 0.00,
            service_total: 0.00,
            tax_total: 0.00,
            total:0.00
        });
        setSoldProduct([]);
        setPayment(0);
        setDiscount(0);
        setCustomer('Consumidor final');
    }

    /*
    * Calculate the total sold on current sale
    * */
    const totalSaleGenerate = (soldProducts: SoldProduct[]) => {

        setSaleTotal(CalculatorTask.calculateSumOfTotal(soldProducts));
        /*
        * Updating Sold Product
        * */
        setSoldProduct(soldProducts);
    }

    /*
     * Handling form product submission
     * */
    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        evt.target.removeEventListener('submit', ()=>{});

        const form = evt.target as HTMLFormElement;
        const productCode: string = form.productCode.value;
        form.productCode.value = '';

        /*
        * Inserting the product values from user
        * */
        let selectedProduct: OnSaleProduct = {
            code: productCode,
            price_total: 0,
            on_sale_quantity: +form.quantity.value,
            discount: discount
        }


        /*
        * Querying the product from requested data.
        * */
        const product: ProductResource[] = queryProduct(productCode, products, 'code');
        if(!(product.length > 0)){
            MessageBox.open('Referência do produto não registrada');
            return;
        }

        /*
        * Verifying if the quantity to be sold is grater than stock quantity
        * */
        if(selectedProduct.on_sale_quantity > +product[0].attributes.stock_quantity){
            MessageBox.open('Não pode tentar vender uma quantidade maior que a existente em stock');
            return;
        }

        /*
        * selectedProduct is the current product, here is getting the total cost
        * */
        selectedProduct.price_total = calculatorTask.calculateFinalPrice(
            product[0].attributes.price_with_tax,
            selectedProduct.on_sale_quantity,
            selectedProduct.discount
        );

        /*
        * Verify discount Value
        * */
        if (100 === selectedProduct.discount) {
            MessageBox.open('Insira corretamente o valor do desconto');
            return;
        }


        /**
         * Setting product to be sold into a store variable
         * */
            // @ts-ignore
        const newProduct: SoldProduct =  {
            ...product[0].attributes,
                price_with_tax: +product[0].attributes.price_with_tax,
                tax_total_added: +product[0].attributes.tax_total_added,
                price: +product[0].attributes.price,
                product_id: +product[0].id,
                product_type_symbol: product[0].relationships.productType.symbol,
                product_type_name: product[0].relationships.productType.name,
                sold_quantity: selectedProduct.on_sale_quantity,
                discount: discount,
                tax_type: product[0].relationships.tax.symbol,
                tax_total: +product[0].attributes.tax_total_added * selectedProduct.on_sale_quantity,
                total: selectedProduct.price_total
            };

        setSoldProduct(CalculatorTask.calculateProducts(soldProducts, newProduct));

        /*
        * Generating the total of sale
        * */
        totalSaleGenerate(soldProducts);
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
    const removeProduct = (soldProducts: SoldProduct[], productArrayKey: number) => {
        if ((productArrayKey >= 0)) {
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
    * Very payment by invoiceType
    * */
    const verifyPayment = (state: boolean): boolean => {
        if(state){
            if (paymentWay === PaymentWays.NU) {
                if (!(payment > 0)) {
                    MessageBox.open('Insira o valor de pagamento');
                    return true;
                }
                if (payment < change || saleTotal.total < 0 || payment < saleTotal.total) {
                    MessageBox.open('Erro no valor de pagamento');
                    return true;
                }
            }else {
                setPayment(saleTotal.total);
            }
        }
        return false;
    }

    /*
    * Generate Invoice
    * */
    function generateInvoice (docType: DocTypes) {
        setSaleType(0);
        const paidBills: number[] = [
            DocTypes.VD,
            DocTypes.FR
        ];

        const paymentWays: number[] = [
            PaymentWays.CC,
            PaymentWays.OU,
            PaymentWays.CB
        ];

        if (verifyPayment(paidBills.includes(docType))) return;

        saleData = {
            invoice: {
                currency: 'AOA',
                exchange: 750,
                customer: customer,
                paid_value: !paymentWays.includes(paymentWay) ? payment : saleTotal.total,
                change,
                payment_mechanism: paymentCondition,
                payment_way: paymentWay,
                invoice_type_id: docType,
                ...saleTotal
            },
            soldProducts
        };

        Preloader.active();
        SaleRequests.saveInvoice(saleData).then( data  => {
            console.log(data);
            Preloader.inactive();
            clearSates();
        }).catch( e => {
            console.log(e);
            Preloader.inactive();
        });
    }


    useEffect(() => {
        if (sale) {
            loadProducts(data => setProducts(data) , 'sale');
            setSaleState(false);
        }

        /*  Finishing sale after clicker button
        * */
        if(saleType > 0) generateInvoice(saleType) ;
        removeProduct(soldProducts, productArrayKey);
    }, [productArrayKey, saleType, sale, saleTotal, soldProducts, creditNoteState]);

    return (
        <Container id="sale-component" className="animation">
            <div className="row col-12 mb-2">
                <div className="page-title">
                    <div className="col-12 m-auto title-section">
                        <Link to="#" className="border-0 text-decoration-none" aria-current="page">
                            <i className="fa fa-cash-register"/>&nbsp;Vendas</Link>
                    </div>
                </div>
            </div>
            <Row className="col-12 d-flex align-items-stretch ">
                <Col id='sale-content' lg={9} className="card shadow rounded" >
                    <Card.Body>
                        <Row>
                            <Col lg={3}>

                                {/*Form Payment Mechanism*/}
                                <Col lg={12} className="">
                                    <Form>
                                        <Col lg={12}>
                                            <FormLabel htmlFor="payment_mechanism">Cliente</FormLabel>
                                            <Form.Control onChange={ (evt) => setCustomer(evt.target.value) }>
                                            </Form.Control>
                                        </Col>
                                    </Form>
                                </Col>
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
                                            <FormControl type="number" defaultValue={0} onChange={
                                                (evt) => setDiscount(+evt.target.value)} id="discount" required placeholder='Total a descontar'/>
                                        </Col>
                                        <Button type="submit" className="btn btn-primary mt-3 float-end">Adicionar</Button>
                                    </Form>
                                </Col>
                            </Col>

                            {/*Sale Table*/}
                            <Col lg={9} className="table-div" style={{ height: '65vh', overflow: 'auto' }}>
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
                                        <Col>
                                            <div className="col-12">
                                                <FormLabel htmlFor="payment_way">Meios de Pagamento</FormLabel>
                                                <Form.Select id="payment_way" onChange={
                                                    (evt) => setPaymentWay(+evt.target.value)
                                                }>
                                                    <optgroup label={'Meios de pagamento'}>
                                                        <option value={ PaymentWays.NU }>Numerário</option>
                                                        <option value={ PaymentWays.CC }>Cartão de Crédito</option>
                                                        <option value={ PaymentWays.CB }>Cheque Bancário</option>
                                                        <option value={ PaymentWays.OU }>Outros Meios</option>
                                                    </optgroup>
                                                </Form.Select>
                                            </div>
                                        </Col>
                                        {paymentWay === PaymentWays.NU
                                            ?
                                            <>
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
                                            </>
                                            :
                                            <Col>&nbsp;</Col>
                                        }
                                        <Col lg={12} className="">
                                            <FormLabel htmlFor="total">Total Líquido</FormLabel>
                                            <FormControl
                                                type="number" disabled
                                                value={parseFloat((saleTotal?.total).toString()).toFixed(2)}
                                                className="text-end "
                                                placeholder="0.00"/>
                                        </Col>
                                    </Form>
                                </Col>
                            </Col>
                            <Col className='mt-1 row'>
                                <ButtonGroup className="btn-group-vertical">
                                    <Button onClick = {
                                        /* Invoice Receipt */
                                        () => setSaleType(DocTypes.FR)
                                    } className="btn-primary btn-lg">Factura Recibo</Button>
                                    {paymentWay === PaymentWays.NU
                                        ?
                                        <Button onClick = {
                                            /* Sale Money */
                                            () => setSaleType(DocTypes.VD)
                                        } className="btn-primary btn-lg">Venda à Dinheiro</Button>
                                        : ''
                                    }
                                    <Button onClick = {
                                        /* Credit Note */
                                        () => setCreditNoteState(!creditNoteState)
                                    } className="btn-primary btn-lg">Nota de Crédito</Button>
                                </ButtonGroup>
                            </Col>
                        </Card.Body>
                        <Card.Footer>
                            <Col lg={12}>
                                <Button
                                    className="bg-success btn-primary btn-lg float-end">Imprimir novamente</Button>
                            </Col>
                        </Card.Footer>

                    </Col>
                </Col>
            </Row>
             { creditNoteState ? <SaleFormCreditNote state={ (creditNoteState )} /> : '' }
        </Container>
    );
}

export default Sales;
