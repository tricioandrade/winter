
const _ = `
<div id="home-component" class="container animation">
    <div class="row col-12 mb-5">
        <div class="included-menu">
            <div class="col-12 m-auto text-center p-0 title-section">
                <a href="#" class="btn border-0" aria-current="page"><i class="fa fa-home"></i>&nbsp;Início</a>
            </div>
        </div>
    </div>
    <div  id="request-component" class="row d-flex align-items-stretch">
        <div class="card col m-1  rounded">
            <div class="card-img-top">
                <i class="fa fa-cash-register"></i>
            </div>
            <div class="card-body">
                <h5 class="card-title">Vendas</h5>
                <p class="card-text">Área de vendas, realizar uma venda, criar e registrar ecomenda,  factura proforma e emissão de recibo.</p>
            </div>
            <div class="card-footer align-items-center text-center">

            <a  href="/sales" id="sales" onclick="route()" class="btn btn-primary">Abrir secção</a>
            </div>
        </div>
        <div class="card  col m-1  rounded">
            <div class="card-img-top">
                <i class="fa fa-receipt"></i>
            </div>
            <div class="card-body">
                <h5 class="card-title">Inventário</h5>
                <p class="card-text">Cadastramento e registro de produtos, tabela de preço, impressão, gestão de stock, geral, armazém.</p>
            </div>
                <div class="card-footer align-items-center text-center">

            <a href="/inventory" id="inventory" onclick="route()" class="btn btn-primary">Abrir secção</a>
            </div>
        </div>
        <div class="card  col m-1  rounded">
            <div class="card-img-top">
                <i class="fa fa-file-invoice"></i>
            </div>
            <div class="card-body">
                <h5 class="card-title">Relatórios</h5>
                <p class="card-text">Relatórios, informação geral,  relatórios de venda e de stock incluidos também relatórios de produtos.</p>
            </div>
            <div class="card-footer align-items-center text-center">
                <a href="/receipts" id="receipts" onclick="route()" class="btn btn-primary">Abrir secção</a>
            </div>
        </div>
        <div class="card  col m-1  rounded">
            <div class="card-img-top">
                <i class="fa fa-file-invoice"></i>
            </div>
            <div class="card-body">
                <h5 class="card-title">Usuários</h5>
                <p class="card-text">Relatórios, informação geral,  relatórios de venda e de stock incluidos também relatórios de produtos.</p>
            </div>
            <div class="card-footer align-items-center text-center">
            <a href="/settings" id="users" onclick="route()" class="btn btn-primary">Abrir secção</a>
            </div>
        </div>
    </div>
</div>

`;
export default _;
