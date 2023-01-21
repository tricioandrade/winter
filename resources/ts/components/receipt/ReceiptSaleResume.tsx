import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Card, Col, Form } from "react-bootstrap";
import CalculatorTask from '../../tasks/CalculatorTask';

const ReceiptSaleResume = (props: any) => {
    if(!props?.invoices) return <></>;
    const [invoiceId, setInvoiceId] = useState<number>(-1);
    const total: number = CalculatorTask.calculateInvoiceTotal(props.invoices);

    const handleSubmit = (evt: FormEvent): void =>  {
            evt.preventDefault();
            const id: number = +((evt.target as HTMLElement).querySelector('button') as HTMLButtonElement).value;
            setInvoiceId(id);
    };

    const printInvoice = (invoiceId: number) => {
        if(invoiceId < 0) return;
        
    };

    useEffect( () => {

        printInvoice(invoiceId);
    }, [invoiceId]);

    return (
        <Card  className="shadow rounded float-end">
            <Card.Body>
                <h5>Resumo de vendas</h5>
            </Card.Body>
            <Card.Footer>
                <div className="row card-body text-left" style={{ height: '30vh', overflow: 'auto' }}>
                    <table id="receiptSaleResume" className="table" onSubmit={ handleSubmit }>
                        <thead>
                            <tr>
                                <th>N.</th>
                                <th>Número da Factura</th>
                                <th>Tipo de Factura</th>
                                <th>Usuário</th>
                                <th>Data</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                            props.invoices?.[0] ? 
                                props.invoices.map((element: any[], key: number) => {
                                    return (
                                        <tr key={key}>
                                            <td> { key + 1 } </td>
                                            <td> { element?.attributes?.invoice_number } </td>
                                            <td> { element?.attributes?.invoice_type_name } </td>
                                            <td> { element?.relationships?.user?.attributes?.name } </td>
                                            <td> { element?.attributes?.date } </td>
                                            <td> { element?.attributes?.total } kz</td>
                                            <td> 
                                                <Form key={key}>
                                                    <Button type='submit' valeu={ element?.id }><i className='fa fa-print' /></Button>    
                                                </Form>    
                                            </td>
                                        </tr>
                                    );
                                }) : <></>
                            }
                        </tbody>
                    </table>
                </div>
                <Col lg={12}>
                    <hr/>
                    <pre><h5>Total facturado: { total }kz</h5></pre> 
                    <pre><h5>Documentos: { props.invoices.length }</h5></pre>
                </Col>
            </Card.Footer>
        </Card>
    )
}

export default  ReceiptSaleResume;