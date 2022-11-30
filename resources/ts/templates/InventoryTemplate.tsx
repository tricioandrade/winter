import React from "react";
import {InventorySaveProducts} from "./InventorySaveProducts";
import {Link} from "react-router-dom";
import { Container, Row} from "react-bootstrap";
import SearchProductTemplate from "./searchProductTemplate";

export const InventoryTemplate = () => {

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
                <Row>
                    <SearchProductTemplate />
                </Row>
                <Row className='card p-2 shadow rounded'  style={{height: '78vh', overflow: 'auto', paddingBottom: '40px'}}>
                    <InventorySaveProducts/>
                    {/*${InventoryFormUpdateProduct}*/}
                </Row>
            </Row>
        </Container>
    )
}

