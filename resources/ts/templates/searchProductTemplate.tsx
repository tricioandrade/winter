import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";


const SearchProducts = () => {


    return (
        <>
            <Form id="productSearch" className="">
               <Row>
                   <Col lg={7} className="card d-flex p-2 shadow rounded align-baseline">
                       <label className="p-2" htmlFor="product-input">Produto ou Serviço</label>
                       <input className="form-control" list="productListSearch" id="productSearchInput"
                              placeholder="Busque por produto..."/>
                       <datalist className="productList" id="productListSearch"></datalist>
                   </Col>
                   <Col lg={4} className="d-flex">
                       <Button type="submit" className="btn text-center"><i className="fa fa-search"></i></Button>
                   </Col>
               </Row>
            </Form>
            <Col className="row d-flex align-items-stretch pt-1" id="listedSearchProduct">
            </Col>
        </>
    )
}
export default SearchProducts;
