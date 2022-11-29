import React from "react";
import {Link} from "react-router-dom";

const _ = (
<div id="home-component" className="container animation">
    <div className="row col-12 mb-5">
        <div className="included-menu">
            <div className="col-12 m-auto text-center p-0 title-section">
                <Link to="#" className="border-0 text-dark text-decoration-none" aria-current="page"><i className="fa fa-home"/>&nbsp;Início</Link>
            </div>
        </div>
    </div>
    <div  id="request-component" className="row d-flex align-items-stretch">
        <div className="card col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-cash-register"/>
            </div>
            <div className="card-body">
                <h5 className="card-title">Vendas</h5>
                <p className="card-text">Área de vendas, realizar uma venda, criar e registrar ecomenda,  factura proforma e emissão de recibo.</p>
            </div>
            <div className="card-footer align-items-center text-center">

            <Link to="/sales" id="sales"  className="btn btn-primary">Abrir secção</Link>
            </div>
        </div>
        <div className="card  col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-receipt"/>
            </div>
            <div className="card-body">
                <h5 className="card-title">Inventário</h5>
                <p className="card-text">Cadastramento e registro de produtos, tabela de preço, impressão, gestão de stock, geral, armazém.</p>
            </div>
                <div className="card-footer align-items-center text-center">

            <Link to="/inventory" id="inventory"  className="btn btn-primary">Abrir secção</Link>
            </div>
        </div>
        <div className="card  col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-file-invoice" />
            </div>
            <div className="card-body">
                <h5 className="card-title">Relatórios</h5>
                <p className="card-text">Relatórios, informação geral,  relatórios de venda e de stock incluidos também relatórios de produtos.</p>
            </div>
            <div className="card-footer align-items-center text-center">
                <Link to="/receipts" id="receipts"  className="btn btn-primary">Abrir secção</Link>
            </div>
        </div>
        <div className="card  col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-users-cog"/>
            </div>
            <div className="card-body">
                <h5 className="card-title">Usuários</h5>
                <p className="card-text">Relatórios, informação geral,  relatórios de venda e de stock incluidos também relatórios de produtos.</p>
            </div>
            <div className="card-footer align-items-center text-center">
                <Link to="/settings" id="users"  className="btn btn-primary">Abrir secção</Link>
            </div>
        </div>
    </div>
</div>

);
export default _;
