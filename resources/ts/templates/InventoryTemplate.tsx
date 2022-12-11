import React, {FormEvent, useEffect, useState} from "react";
import {InventorySaveProducts} from "../components/InventorySaveProducts";
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import {Product} from "../interfaces/Product";
import ListProductsOnCard from "./ListProductsOnCard";
import ListOfProducts from "./ListOfProducts";
import {getProducts} from "../tasks/GetProducts";
import '../../css/Inventory.css';
import {queryProduct} from "../tasks/ProductFilter";

export const InventoryTemplate =  () => {

    const [form,       setFormState] = useState<boolean>(true);
    const [product,      setProduct] = useState<Product[]>([]);
    const [products,    setProducts] = useState<Product[]>([]);
    const [rows,            setRows] = useState<boolean>(false);

    const searchProduct = async (evt: FormEvent) => {
        evt.preventDefault();
        const productName = (evt.target as HTMLFormElement).productName.value;
        setRows(true);
        if (productName.length){
            setProduct(queryProduct(productName, products));
        }else{
            setProduct(products);
        }
    };



    useEffect( () => {
        if (form) {
            getProducts(data=> setProducts(data) );
            setFormState(false);
        }
    }, [form]);

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
                    <Form  id="productSearch" onSubmit={
                        (event: FormEvent) => searchProduct(event)
                    } className="p-0" >
                        <Row>
                            <Col lg={7} className="d-flex p-2 shadow rounded align-baseline">
                                <FormControl id="productName" list='myList' placeholder="Busque por produto..."/>
                                <datalist id={'myList'}>
                                    {ListOfProducts(products, 'name')}
                                </datalist>
                            </Col>
                            <Col lg={4} className="d-flex">
                                <Button type="submit"  className="btn text-center"><i className="fa fa-search"></i></Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>

                {rows ?
                    <>
                        <Col lg={12}>
                            <Button onClick={ () => setRows(false) } className={'.animation'} >Fechar</Button>
                        </Col>
                        <Row id={'listedProducts'} className="d-flex col-12 align-items-stretch" style={{height: '58vh', overflow: 'auto'}} >
                            { ListProductsOnCard(product) }
                        </Row>
                    </>
                    :
                    <InventorySaveProducts getProducts={products} />
                }
            </Row>
        </Container>
    )
}

