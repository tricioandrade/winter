import React from 'react';
import { Card } from 'react-bootstrap';


const ReceiptSoldProductResume  = (props: any) => {
    if(!props?.invoices) return <></>;
    return (
        <Card className="shadow rounded ">
            <Card.Body>
                <h5 className='card-title'>Produtos vendidos</h5>
            </Card.Body>
            <Card.Footer>
                <div className="row card-body text-left" style={{ height: '30vh', overflow: 'auto' }}>
                    <table id="receiptSaleResume" className="table" >
                        <thead>
                            <tr>
                                <th>N.</th>
                                <th>Nome</th>
                                <th>Número da factura</th>
                                <th>Desconto</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                            props.products?.[0] ? 
                                props.products.map((element: any[], key: number) => {
                                    return element.map( (products: any[], keyId: number) => {      
                                        return (
                                            <tr key={key}>
                                                <td> { keyId + 1 } </td>
                                                <td> { products?.attributes?.name } </td>
                                                <td> { props.invoices[key]?.attributes?.invoice_number } </td>
                                                <td> { products?.attributes?.discount } </td>
                                                <td> { products?.attributes?.sold_quantity } kz</td>
                                                <td> { products?.attributes?.total }</td>
                                            </tr>
                                        );
                                    });
                                }) : <></>
                            }
                        </tbody>
                    </table>
                </div> 
            </Card.Footer>
        </Card>
    );
}

export default  ReceiptSoldProductResume;
