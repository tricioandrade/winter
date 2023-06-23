import React, { FormEvent, useEffect, useState } from "react";
import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";
import Preloader from "../../tasks/Preloader";
import InvoicesRequests from "../../requests/InvoicesRequests";
import { LoadInvoices } from "../../tasks/LoadInvoices";
import { QueryInvoices } from "../../tasks/QueryInvoices";


export const SaleDebitNote = (state: any) => {
    console.log(state);

    const [componentStatus, setComponentStatus] = useState(state);
    const [loadStatus,           setLoadStatus] = useState(state);
    const [invoiceData,         setInvoiceData] = useState<any[]>([]);
    const [products,               setProducts] = useState<any[]>([]);
    const [invoiceRef,           setInvoiceRef] = useState<string>('');


    const handleChange = () => {

    }

    const rowsOfProducts = (products: any[]) => {
        if (!products.length) return ;
        console.log('PO', products);

        return products[0]?.relationships.products.map((item: any, key: number) => {
            return (
            <tr key={key}>
                <td>{item?.attributes?.name}</td>
                <td>{parseFloat(item?.attributes?.decimal_price_with_tax).toFixed(2)}</td>
                <td>{item?.attributes?.decimal_price_with_tax}%</td>
                <td><Form><Form.Control type="number" defaultValue={item.id} hidden />
                    <Form.Control id="quantity" width={30}  type="number" defaultValue={ item?.attributes?.decimal_tax_total } /></Form></td>
                <td>{item?.attributes?.discount}%</td>
                <td>{parseFloat(item?.attributes?.total).toFixed(2)} Kz</td>
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
                                        <h6>Emitir nota de débito</h6>
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
                                                <ButtonGroup className="btn-group-vertical">
                                                    <Button onClick={ saveChanges }  type="submit" className="btn btn-primary mt-3 btn-lg float-end bg-success">Salvar</Button>
                                                    <Button onClick={ nullCompletly } type="submit" className="btn btn-primary mt-3 btn-lg float-end bg-danger">Anular factura</Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Col>
                                        <Col lg={9} className="table-div" style={{ height: '55vh', overflow: 'auto' }}>
                                            <table id="saleTable" className="table" >
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
