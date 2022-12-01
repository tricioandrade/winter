import React, { useState } from "react";
import {InventorySaveProducts} from "./InventorySaveProducts";
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import SearchProductTemplate from "./searchProductTemplate";
import InventoryUpdateProducts from "./InventoryUpdateProducts";

export const InventoryTemplate = () => {

    const [page, setPage] = useState('');

    return (
        <Container id="inventory-component" className="animation">
            <Row className="col-12 mb-2">
                <div className="page-title">
                    <div className="col-12 m-auto title-section">
                        <Link to="#" className="border-0 text-decoration-none" aria-current="page">
                            <i className="fa fa-file-invoice"/>&nbsp;Inventário</Link>
                    </div>
                </div>
            </Row>
            <Row className="animation col-12">
                <Row className='mb-3'>
                    <SearchProductTemplate />
                </Row>
                <Row>
                    <ButtonGroup size="sm">
                        <Button onClick={ () => setPage( () => 'save-product'  ) } >Cadastrar produto</Button>
                        <Button onClick={ () => setPage(() => 'update-product' ) } >Actualizar dados de produto</Button>
                    </ButtonGroup>
                </Row>
                <Row style={{height: '78vh', overflow: 'auto', paddingBottom: '40px'}}>
                    <Row lg={12} className="d-flex align-items-stretch pt-1" id="listedSearchProduct"></Row>
                    <Card className='shadow rounded ml-1 col-12'>
                        <Card.Body>
                            <Col lg={12}>
                                { page === 'update-product' ? <InventoryUpdateProducts/> :  <InventorySaveProducts/> }
                            </Col>
                        </Card.Body>
                    </Card>
                </Row>
            </Row>
        </Container>
    )
}

