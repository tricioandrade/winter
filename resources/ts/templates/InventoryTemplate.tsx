import React, {useEffect, useState} from "react";
import {InventorySaveProducts} from "../components/InventorySaveProducts";
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import ProductsRequests from "../requests/ProductsRequests";

export const InventoryTemplate: React.FC = () => {

    const [productName, setProductName] = useState<string>('');

    const searchProducts = (evt: Event) => {
        evt.preventDefault();
        const form = evt.target as HTMLFormElement;
        setProductName(form.productName.value);
        console.log(form);
        console.log(form.productName.value);
    };

    useEffect( () => {
        if(productName === '') return;
        ProductsRequests.getProductByName(productName).then( data => {
            console.log(data);
        }).catch( err => {
            console.log(err)
        });
    }, [productName]);

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
                <Row className='mb-3 col-12'>
                    <Form id="productSearch" className="p-0" onSubmit={
                        (event: Event | any) => searchProducts(event)
                    } >
                        <Row>
                            <Col lg={7} className="d-flex p-2 shadow rounded align-baseline">
                                <FormControl id="productName" placeholder="Busque por produto..."/>
                            </Col>
                            <Col lg={4} className="d-flex">
                                <Button type="submit"  className="btn text-center"><i className="fa fa-search"></i></Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>

                <InventorySaveProducts />
            </Row>
        </Container>
    )
}

