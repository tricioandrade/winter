import React from "react";
import {Button, Form} from "react-bootstrap";

const rowsOfProducts = (products: any[]) => {
    if (!products.length) return ;
    return products.map((item: any, key: number) => {
        return (
        <tr key={key}>
            <td>{item.name}</td>
            <td>{parseFloat(item.price_with_tax).toFixed(2)}</td>
            <td>{item.sold_quantity}</td>
            <td>{item.tax_value}%</td>
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

export default rowsOfProducts;
