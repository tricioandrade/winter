import React from "react";
import {Link} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

const HomeTemplate = (
<Container id="home-component" className="animation">
    <div className="row col-12 mb-5">
        <div className="page-title">
            <div className="col-12 m-auto ">
                <Link to="#" className="border-0 text-decoration-none" aria-current="page">
                    <i className="fa fa-home"/>&nbsp;Início</Link>
                <hr/>
            </div>
        </div>
    </div>
    <div className="row d-flex align-items-stretch">
        <Card className="col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-cash-register"/>
            </div>
            <Card.Footer className="align-items-center text-center">
                <Link to="/sales" id="sales"  className="btn btn-primary">Vendas</Link>
            </Card.Footer>
        </Card>
        <Card className="col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-receipt"/>
            </div>
            <Card.Footer className="align-items-center text-center">
                <Link to="/inventory" id="inventory"  className="btn btn-primary">Inventário</Link>
            </Card.Footer>
        </Card>
        <Card className=" col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-file-invoice" />
            </div>
            <Card.Footer className="align-items-center text-center">
                <Link to="/receipts" id="receipts"  className="btn btn-primary">Relatórios</Link>
            </Card.Footer>
        </Card>
        <Card className="col m-2  rounded">
            <div className="card-img-top">
                <i className="fa fa-users-cog"/>
            </div>
            <Card.Footer className="align-items-center text-center">
                <Link to="/settings" id="users"  className="btn btn-primary">Usuários</Link>
            </Card.Footer>
        </Card>
    </div>
</Container>

);
export default HomeTemplate;
