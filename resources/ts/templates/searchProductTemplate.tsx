import React from "react";
import {Button, Col, Form} from "react-bootstrap";


const SearchProducts = () => {


    return (
        <>
            <Col lg={12} className='pl-0'>
                <Form id="productSearch" className="row d-flex lh-1 align-items-stretch">
                    <Col lg={8} className="card d-flex p-2 pl-0 shadow rounded align-baseline">
                        <label className="p-2" htmlFor="product-input">Produto ou Serviço</label>
                        <input className="form-control" list="productListSearch" id="productSearchInput"
                               placeholder="Busque por produto..."/>
                        <datalist className="productList" id="productListSearch"></datalist>
                    </Col>
                        <Button type="submit" className="btn text-center"><i className="fa fa-search"></i></Button>
                </Form>
            </Col>
            <Col className="row d-flex align-items-stretch pt-1" id="listedSearchProduct">
            </Col>
        </>
    )
}
export default SearchProducts;
