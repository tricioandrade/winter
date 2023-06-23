import React, { FormEvent, useEffect, useState } from "react";
import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";
import Preloader from "../../tasks/Preloader";
import InvoicesRequests from "../../requests/InvoicesRequests";
import { LoadInvoices } from "../../tasks/LoadInvoices";
import { QueryInvoices } from "../../tasks/QueryInvoices";
import { SaleTotal } from "../../interfaces/SaleTotal";


export const SaleFormCreditNote = (state: any) => {
    console.log(state);

    const [componentStatus, setComponentStatus] = useState(state);
    const [loadStatus,           setLoadStatus] = useState(state);
    const [invoiceData,         setInvoiceData] = useState<any[]>([]);
    const [products,               setProducts] = useState<any[]>([]);
    const [invoiceRef,           setInvoiceRef] = useState<string>('');
    const [changedProducts, setChangedProducts] = useState<any>();
    const [saleTotal,             setSaleTotal] = useState<SaleTotal>({
        commercial_discount: 0.00,
        merchandise_total: 0.00,
        service_total: 0.00,
        tax_total: 0.00,
        total:0.00
    });


    const handleSubmitOnTable = (evt: FormEvent) => {
        evt.preventDefault();
        // if((evt.target as HTMLElement).querySelector('input#quantity')){
            const element = (evt.target as HTMLElement).querySelector('input#quantity');
            console.log(element);
            console.log(evt.target);
        // }

        if((evt.target as HTMLElement).querySelector('button')){
            const value = +((evt.target as HTMLElement).querySelector('button') as HTMLButtonElement).value;
        }
        // setProductArrayKey(value);
    }

    const change = (evt: FormEvent) => {
        const form: HTMLFormElement = (evt.target as HTMLElement).parentElement as HTMLFormElement;
        console.log(JSON.parse(form.product.value));
    }

    const rowsOfProducts = (products: any[]) => {
        if (!products.length) return ;
        console.log('PO', products);

        return products[0]?.relationships.products.map((item: any, key: number) => {
            return (            
                <tr key={key}>
                    <td>{item?.attributes?.name}</td>
                    <td>
                        <Form onChange={ change }>
                            <Form.Control id="product" defaultValue={JSON.stringify(item)} hidden />
                            <Form.Control min={0} max={item?.attributes?.sold_quantity} id="quantity" width={30}  
                                type="number" defaultValue={ item?.attributes?.sold_quantity } />
                        </Form>
                    </td>
                    <td>
                        <Form>
                            <Button id="remove" type='submit' value={item.id} className='btn-danger text-light'><i className='fa fa-trash'/></Button>
                        </Form>
                    </td>
                </tr>
            );
        });
    }
    
    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        const value: string = ((evt.target as HTMLElement).querySelector('#invoiceRef') as HTMLButtonElement).value;
        setInvoiceRef(value);
    }

    const nullCompletly = (evt: FormEvent) => {
        evt.preventDefault();
        const value: string = ((evt.target as HTMLElement).querySelector('#invoiceRef') as HTMLButtonElement).value;
        setInvoiceRef(value);
    }

    const saveChanges = (evt: FormEvent) => {
        evt.preventDefault();
        const value: string = ((evt.target as HTMLElement).querySelector('#invoiceRef') as HTMLButtonElement).value;
        setInvoiceRef(value);
    }

    /*
    * Generate Invoice
    * */
    function generateInvoice () {
        let saleData = {};
        saleData = {
            // ...invoiceData.attributes,
                currency: 'AOA',
                exchange: 750,
                // // paid_value: !paymentWays.includes(paymentWay) ? payment : saleTotal.total,
                // change,
                // payment_mechanism: paymentCondition,
                // payment_way: paymentWay,
                // invoice_type_id: docType,
                // ...saleTotal
            };
            // soldProducts

        // Preloader.active();
        // SaleRequests.saveInvoice(saleData).then( data  => {
        //     console.log(data);
        //     Preloader.inactive();
        //     clearSates();
        // }).catch( e => {
        //     console.log(e);
        //     Preloader.inactive();
        // });
    }


    useEffect(()=> {
        if(loadStatus){
            LoadInvoices((data) => setInvoiceData(data));
            setLoadStatus(!loadStatus);
        }
        
        if(invoiceData.length && invoiceRef.length){
            setProducts(QueryInvoices( invoiceRef, invoiceData, 'ref' ));
            console.log(products);
            setInvoiceRef('');
        }

        console.log(invoiceData);
        console.log(invoiceRef);
    }, [componentStatus, invoiceData, products, invoiceRef]);

    return (
     <>
        { componentStatus ?
            <>
                <div className="backShadow"></div>
                <section id="creditNoteSection">
                    <Container>
                        <Row>
                            <Card className="rounded bg-light p-0" style={{
                                boxShadow: "0px !important"
                            }}>
                                <Card.Body>
                                    <Col lg={12} className='text-center'>
                                        <h6>Emitir nota de crédito</h6>
                                    </Col>
                                    <Col lg={12} className='row'>
                                        <Col lg={3} className='row'>
                                            <Col lg={12}>
                                                <strong><h6>Dados da factura</h6></strong>
                                                <Form onSubmit={ handleSubmit }>
                                                    <Col lg={12}>
                                                        <Form.Label htmlFor="invoiceRef">Insira a referência da factura</Form.Label>
                                                        <Form.Control id="invoiceRef"  />
                                                    </Col>
                                                    <Button type="submit" className="btn btn-primary mt-3 float-end">Buscar itens</Button>
                                                </Form>
                                            </Col>
                                            <Col lg={12}>
                                                    <Button onClick={ saveChanges }  type="submit" className="btn btn-primary mt-3 float-end bg-success">Salvar/Imprimir</Button>
                                                    <Button onClick={ nullCompletly } type="submit" className="btn btn-primary mt-3 float-end bg-danger">Anular factura</Button>
                                            </Col>
                                        </Col>
                                        <Col lg={9} className="table-div" style={{ height: '55vh', overflow: 'auto' }}>
                                            <table id="saleTable" className="table"  onSubmit={ handleSubmitOnTable }>
                                                <thead>
                                                <tr>
                                                    <th>Descrição</th>
                                                    <th>Quantidade</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                { rowsOfProducts(products) }
                                                </tbody>
                                            </table>
                                        </Col>
                                    </Col>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Col lg={12}>
                                        <Button onClick={ () => setComponentStatus(!componentStatus)} 
                                        className="bg-danger btn btn-primary mt-3 float-end">Fechar</Button>
                                    </Col>
                                </Card.Footer>
                            </Card>
                        </Row>
                    </Container>
                </section>
                </> 
            : <></>
            } 
        </>
    )
};
