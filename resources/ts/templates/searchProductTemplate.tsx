import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";


const SearchProducts = () => {


    return (
        <>
            <Form id="productSearch" className="p-0">
               <Row>
                   <Col lg={7} className="d-flex p-2 shadow rounded align-baseline">
                       <input className="form-control" list="productListSearch" id="productSearchInput"
                              placeholder="Busque por produto..."/>
                       <datalist className="productList" id="productListSearch"></datalist>
                   </Col>
                   <Col lg={4} className="d-flex">
                       <Button type="submit" className="btn text-center"><i className="fa fa-search"></i></Button>
                   </Col>
               </Row>
            </Form>
        </>
    )
}
export default SearchProducts;
