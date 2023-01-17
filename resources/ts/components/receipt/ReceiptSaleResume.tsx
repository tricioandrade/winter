import React from 'react';
import { Card, Form } from "react-bootstrap";

const ReceiptSaleResume = (props: any) => {
    // if(!props.invoices?.[0]) return(<>Não existem Facturas</>);
    console.log(props);
    return (
        <Card className="shadow rounded">
            <Card.Body>
                <h5>Resumo de vendas</h5>
            </Card.Body>
            <Card.Footer>
                <div className="row card-body text-left" style={{ height: '30vh', overflow: 'auto' }}>
                    <table id="receiptSaleResume" className="table">
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
                                                <Form key={key} onSubmit={ (evt) => {

                                                }} >
                                                    <Button type='submit'></Button>    
                                                </Form>    
                                            <td/>
                                        </tr>
                                    );
                                }) : <></>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer flex flex-column d-inline">
                    <h2 className="">Total: </h2>
                    <Form><Form.Control  disabled defaultValue="0.00" /></Form>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default  ReceiptSaleResume;