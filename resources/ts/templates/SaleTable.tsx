import React from "react";
import {Col} from "react-bootstrap";



export const SaleTable = () => {
    return (
        <Col>
            <table id="saleTable" className="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Imposto</th>
                        <th>Desconto</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </Col>
    )
}
