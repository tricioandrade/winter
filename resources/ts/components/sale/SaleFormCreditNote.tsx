import React, { useEffect, useState } from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Preloader from "../../tasks/Preloader";
import InvoicesRequests from "../../requests/InvoicesRequests";
import { LoadInvoices } from "../../tasks/LoadInvoices";


export const SaleFormCreditNote = (state: any) => {
    console.log(state);
    const [componentStatus, setComponentStatus] = useState(state);
    const [loadStatus,           setLoadStatus] = useState(state);
    const [invoiceData,         setInvoiceData] = useState<any[]>([]);

    const rowsOfProducts = (products: any[]) => {
        if (!products.length) return ;

        return products.map((item: any, key: number) => {
            return (
            <tr key={key}>
                <td>{item.name}</td>
                <td>{parseFloat(item.decimal_price_with_tax).toFixed(2)}</td>
                <td><Form><Form.Control defaultValue={item.id} /><Form.Control defaultValue={{item.sold_quantity}} /></Form></td>
                <td>{item.decimal_tax_total}%</td>
                <td>{item.discount}%</td>
                <td>{parseFloat(item.total).toFixed(2)} Kz</td>
                <td>
                    <Form>
                        <Button type='submit' value={item.id} className='btn-danger text-light'><i className='fa fa-trash'/></Button>
                    </Form>
                </td>
            </tr>
            );
        });
    }
    

    useEffect(()=> {
        if(loadStatus){
            LoadInvoices((data) => setInvoiceData(data));
            setLoadStatus(!loadStatus);
        }
        
    }, [componentStatus]);

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
                                                <Form>
                                                    <Col lg={12}>
                                                        <Form.Label htmlFor="invoiceRef">Insira a referência da factura</Form.Label>
                                                        <Form.Control id="invoiceRef"  />
                                                    </Col>
                                                    <Button type="submit" className="btn btn-primary mt-3 float-end">Buscar itens</Button>
                                                </Form>
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
                                                {/* { rowsOfProducts(soldProducts) } */}
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
