import React, {FormEvent, useEffect, useState} from "react";
import {ProductResource} from "../../interfaces/ProductResource";
import {queryProduct} from "../../tasks/queryProduct";
import {loadProducts} from "../../tasks/loadProducts";
import {Button, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ListOfProducts from "../../templates/ListOfProducts";
import ListProductsOnCard from "../../templates/ListProductsOnCard";
import {InventorySaveProducts} from "./InventorySaveProducts";

export const Inventory = () => {

    const [form,       setFormState] = useState<boolean>(true);
    const [product,      setProduct] = useState<ProductResource[]>([]);
    const [products,    setProducts] = useState<ProductResource[]>([]);
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
            loadProducts(data=> setProducts(data) );
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

            {/*Search Form*/}
            <Row className="animation">
                <Row className='mb-3'>
                    <Form  id="productSearch" onSubmit={
                        (event: FormEvent) => searchProduct(event)
                    } className="row" >
                        <Col lg={7} >
                            <FormControl id="productName" list='myList' placeholder="Busque por produto..."/>
                            <datalist id={'myList'}>
                                {ListOfProducts(products, 'name')}
                            </datalist>
                        </Col>
                        <Col lg={4}>
                            <Button type="submit"  className="btn text-center">
                                <i className="fa fa-search" />&nbsp;Pesquisar
                            </Button>
                        </Col>
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

