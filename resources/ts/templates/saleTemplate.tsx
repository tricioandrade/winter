import SaleFormPayment from "./saleFormPayment";
import SaleFormCreditNote from "./saleFormCreditNote";
import SaleFormProducts from "./SaleFormProducts";
import SaleTable from "./SaleTable";
import SaleFormAccount from "./SaleFormAccount";
import React from "react";

export const saleTemplate = (
<div id="sales-css" className="container animation">
    <div className="row">
        <h4><i className="fa fa-cash-register"/>&nbsp;Vendas</h4>
        <hr/>
    </div>
    <div className="row">
        <div className="col-3">
            ${ SaleFormCreditNote }
            ${ SaleFormPayment }
            ${ SaleFormProducts }
        </div>
        <div className="col-9 row">
            <div className="col-12 card p-2 shadow rounded m-1  p-2" style={{height: '70vh'}}>
                <div className="table-div"  style={{height: '68vh', overflow: 'auto'}}>
                    ${ SaleTable }
                </div>
                    ${ SaleFormAccount}
            </div>

            <div id="btn-section" className="col-4">
                <div className="btn-group" role="group" aria-label="Basic example">
                      <button id="printAgain" type="button" className="btn btn-primary">Imprimir novamente</button>
                </div>
            </div>
            <div id="btn-section" className="col-8 row text-end p-0">
                <button id="FR" type="button" className="btn col float-end btn-primary">Imprimir Factura Recibo</button>
                <button id="VD" type="button" className="btn col float-end btn-primary">Imprimir Venda à Dinheiro</button>
                <button id="NC" type="button" className="btn col float-end btn-primary">Imprimir Nota de Crédito</button>
            </div>
        </div>
    </div>
</div>
);


