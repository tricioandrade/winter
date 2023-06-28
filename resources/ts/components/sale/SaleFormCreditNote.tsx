import React, { FormEvent, useEffect, useState } from "react";
import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";
import Preloader from "../../tasks/Preloader";
import InvoicesRequests from "../../requests/InvoicesRequests";
import { LoadInvoices } from "../../tasks/LoadInvoices";
import { QueryInvoices } from "../../tasks/QueryInvoices";
import { SaleTotal } from "../../interfaces/SaleTotal";
import { SoldProduct } from "../../interfaces/SoldProduct";
import CalculatorTask from "../../tasks/CalculatorTask";
import { queryProduct, querySoldProduct } from "../../tasks/queryProduct";
import { SoldProductResource } from "../../interfaces/SoldProductResource";
import { InvoiceResource } from "../../interfaces/InvoiceResource";
import MessageBox from "../../tasks/MessageBox";

export const SaleFormCreditNote = (state: any) => {
    console.log(state);

    const [productToChange, setProductToChange] = useState<any[]>([]);

    const [componentStatus, setComponentStatus] = useState(state);
    const [loadStatus,           setLoadStatus] = useState(state);
    const [invoiceData,         setInvoiceData] = useState<any[]>([]);
    const [soldProducts,       setSoldProducts] = useState<InvoiceResource[]>([]);
    const [invoiceRef,           setInvoiceRef] = useState<string>('');
    const [changedProducts, setChangedProducts] = useState<any>();
    const [saleTotal,             setSaleTotal] = useState<SaleTotal>({
        commercial_discount: 0.00,
        merchandise_total: 0.00,
        service_total: 0.00,
        tax_total: 0.00,
        total:0.00
    });


    // const handleProductChange = (evt: FormEvent) => {
    //     evt.preventDefault();
    //     const success   = (evt.target as HTMLElement).querySelector('button#success') as HTMLButtonElement;
    //     const element   = (evt.target as HTMLElement).querySelector('input#quantity') as HTMLInputElement;
    //     const elementID = (evt.target as HTMLElement).querySelector('input#productId') as HTMLInputElement;

    //     if(success){
    //         console.log(element);
    //         console.log(evt.target);
    //         console.log(+element.value);
                
    //         const product: SoldProductResource[] = soldProducts[0].relationships.products.filter((obj: SoldProductResource)  => {
    //                 console.log('filter: Y', obj); 
    //                 return obj.id === element.value;
    //         });
    //         if(!(product.length > 0)){
    //             MessageBox.open('Referência do produto não registrada');
    //             return;
    //         }
    //         console.log(soldProducts[0].relationships.products);
    //         console.log(product);

    //     }

    // }



    const handleProductChange = (evt: FormEvent) => {
        evt.preventDefault();
        const form = (evt.target as HTMLFormElement);
        form.quantity.value

        let products: SoldProduct[] = [];

        productToChange.forEach((item: SoldProductResource, key: number) => {
            products[key] = {
                ...item.attributes,
                sold_quantity: item.attributes.product_id ===  +form.productId.value ? form.quantity.value : item.attributes.sold_quantity,
                total: +item.attributes.product_id ===  +form.productId.value ? 
                    +item.attributes.price_with_tax * +form.quantity.value : +item.attributes.total,
            }
        });

        setProductToChange(products);
    }

    const fillSoldProducts = (products: any[]) => {
        let filteredProducts: any[] = [];
        products[0]?.relationships.products.map((item: any, key: number) => {
            filteredProducts[key] = {
                ...item
            };
        });
        console.log('Filtered Products: ', filteredProducts);
        setProductToChange(filteredProducts as SoldProduct[]);
    }
    
    const removeProduct = (evt: FormEvent) => {
        evt.preventDefault();
        const form: HTMLFormElement = (evt.target as HTMLFormElement); 

        const index = productToChange.findIndex((object: SoldProductResource) => {
            return object.attributes.product_id === +form.removeProduct.value;
        });
        
        productToChange.splice(index, 1);
        setProductToChange(productToChange);
    }

    const rowsOfProducts = (products: SoldProductResource[]) => {
        if (!products.length) return ;
        console.log(products);
        return products.map((item: SoldProductResource, key: number) => {
            return (            
                <tr key={key}>
                    <td>{item.attributes.name}</td>
                    <td className="row">
                        <Form className="row"  onSubmit={ handleProductChange }>
                            <Col lg={8}>
                                <Form.Control id="productId" type="number" defaultValue={item.attributes.product_id} hidden />
                                <Form.Control min={0} max={item.attributes.sold_quantity} id="quantity" width={30}  
                                    type="number" defaultValue={ +item.attributes.sold_quantity } />
                            </Col>
                            <Col lg={4}>    
                                <Button id="success" type='submit' value={item.attributes.product_id} className='btn-success text-light'><i className='fa fa-save'/></Button>
                            </Col>
                        </Form>
                    </td>
                    <td>
                        <Form onSubmit={ removeProduct }>
                            <Button id="removeProduct" type='submit' value={item.attributes.product_id} className='btn-danger text-light'><i className='fa fa-trash'/></Button>
                        </Form>
                    </td>
                </tr>
            );
        });
    }
    
    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        try{
            const value: string = ((evt.target as HTMLElement).querySelector('#invoiceRef') as HTMLButtonElement).value;
            setInvoiceRef(value);
        }catch(e){
            MessageBox.open(e);
        }
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
            setSoldProducts(QueryInvoices( invoiceRef, invoiceData, 'ref' ));
            fillSoldProducts(QueryInvoices( invoiceRef, invoiceData, 'ref' ));
            setInvoiceRef('');
        }

    }, [componentStatus, invoiceData, soldProducts, invoiceRef, productToChange]);

    return (
     <>
        { true ?
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
                                            <table id="saleTable" className="table" >
                                                <thead>
                                                <tr>
                                                    <th>Descrição</th>
                                                    <th>Quantidade</th>
                                                    <th>&nbsp;</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                { rowsOfProducts(productToChange) }
                                                
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
