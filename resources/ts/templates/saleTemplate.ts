import SaleFormPayment from "./saleFormPayment";
import SaleFormCreditNote from "./saleFormCreditNote";
import SaleFormProducts from "./SaleFormProducts";
import SaleTable from "./SaleTable";
import SaleFormAccount from "./SaleFormAccount";

const _ = `
<div id="sales-css" class="container animation">
    <div class="row">
        <h4><i class="fa fa-cash-register"></i>&nbsp;Vendas</h4>
        <hr>
    </div>
    <div class="row">
        <div class="col-3">
            ${ SaleFormCreditNote }
            ${ SaleFormPayment }
            ${ SaleFormProducts }
        </div>
        <div class="col-9 row">
            <div class="col-12 card p-2 shadow rounded m-1  p-2" style="height: 70vh">
                <div class="table-div"  style="height: 68vh; overflow: auto">
                    ${ SaleTable }
                </div>
                    ${ SaleFormAccount}
            </div>

            <div id="btn-section" class="col-4">
                <div class="btn-group" role="group" aria-label="Basic example">
                      <button id="printAgain" type="button" class="btn btn-primary">Imprimir novamente</button>
                </div>
            </div>
            <div id="btn-section" class="col-8 row text-end p-0">
                <button id="FR" type="button" class="btn col float-end btn-primary">Imprimir Factura Recibo</button>
                <button id="VD" type="button" class="btn col float-end btn-primary">Imprimir Venda à Dinheiro</button>
                <button id="NC" type="button" class="btn col float-end btn-primary">Imprimir Nota de Crédito</button>
            </div>
        </div>
    </div>
</div>
`;


export default _;
