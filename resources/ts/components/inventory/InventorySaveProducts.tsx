import React, {FormEvent, useEffect, useState} from "react";
import {Button,  Card, Col, Form, FormControl, FormLabel, FormSelect, Row} from "react-bootstrap";
import CalculatorTask from "../../tasks/CalculatorTask";
import MessageBox from "../../tasks/MessageBox";
import ProductsRequests from "../../requests/ProductsRequests";
import {nanoid} from "nanoid";
import Preloader from "../../tasks/Preloader";
import {ProductResource} from "../../interfaces/ProductResource";
import ListOfProducts from "../../templates/ListOfProducts";
import {UnitOfMeasures} from "../../enums/UnitOfMeasures";
import {TaxTypes} from "../../enums/TaxTypes";

export const  InventorySaveProducts = ({ getProducts }: any) => {
    const [page, setPage] = useState(true);
    const [taxValue, setTaxValue] = useState(0);
    const [taxAdded, setTaxAdded] = useState(0);
    const [priceWithTax, setPriceWithTax] = useState(0);
    const [price, setPrice] = useState(0);
    const [products, setProducts] =  useState<ProductResource[]>([]);

    useEffect( () => {
        const { priceWithTax, taxAdded } = CalculatorTask.calculatePriceTax({
            price: price,
            taxValue: taxValue,
            discount: 0
        });

        setPriceWithTax(priceWithTax);
        setTaxAdded(taxAdded);

        if (!page) {
            setProducts(getProducts)
        }

    }, [price,  taxValue, page]);

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        const elem = evt.target as HTMLFormElement;
        const taxId: number = +elem.tax_id;

        let product: object = {
            name:               elem.productName.value,
            description:        elem.description.value,
            price:              +elem.price.value,
            price_with_tax:     +elem.price_with_tax.value,
            stock_quantity:     +elem.stock_quantity.value,
            unity_quantity:     +elem.unity_quantity.value,
            for_sale_status:    +elem.for_sale_status.value,
            tax_value:          +elem.tax_value.value,
            tax_total_added:    +elem.tax_total_added.value,
            tax_id:             +elem.tax_id.value
            /*storage_id: elem.storage_id.value,*/
            /*for_sale_quantity: elem.for_sale_quantity.value*/
        }

        /**
         * Add props to product is it's a new to be saved
         * */
        if(page) {
            product = { ...product,
                code: (elem.code.value.length ? elem.code.value : nanoid(12)),
                product_type_id:  +elem.product_type.value,
                unity_of_measure: elem.unity_of_measure.value
            };
        }

        /**
         * Verify if the tax is ISE so then apply exception and reason
         * */
        if (taxId === TaxTypes.ISE){
            product = { ...product,
                tax_exemption_code: elem.tax_exemption_code.value,
                tax_exemption_reason: elem.tax_exemption_reason.value
            }
        }else{
            product = { ...product,
                tax_exemption_code: 'NÃO_APLICA',
                tax_exemption_reason: 'NÃO_APLICA'
            }
        }

        /**
         * Verify if the exception data is correctly filled
         * */
        if (taxId === TaxTypes.ISE && (elem.tax_value !== 0 || elem.tax_exemption_reason.length)) {
            MessageBox.open('O valor do imposto tem de ser 0, e ter um motivo de isenção válido');
            return;
        }

        /*
        * Verify if the value of tax its grater then 0
        * */
        if ((taxId === TaxTypes.IVA || taxId === TaxTypes.IS || taxId === TaxTypes.OUT || taxId === TaxTypes.NS ) && +elem.tax_value <= 0) {
            MessageBox.open('O valor do imposto tem de ser maior que 0');
            return;
        }

        /*
        * @page variable is used to check if the submit form
        * It's for save or update, in case of true for Save, else, false Update
        * */
        if(page) {
            Preloader.active();
            ProductsRequests.saveProduct(product).then((data) => {
                Preloader.inactive();
                MessageBox.open('O produto foi cadastrado');
                console.log(data);
            }).catch( (err) => {
                Preloader.inactive();
                MessageBox.open('Não foi possível salvar o produto');
                console.log(err);
            });
        }

        else {
            Preloader.active();
            ProductsRequests.updateProduct(+elem.product_id.value, product).then( (data) => {
                Preloader.inactive();
                console.log(data);
                MessageBox.open('O produto foi atualizado');
            }).catch( (err) => {
                Preloader.inactive();
                console.log(err);
                MessageBox.open('Não foi possível atualizar o produto');
            });
        }
    }


    return (
        <>
            <Col lg={12} className="row d-flex">
                <Button className={(page  ? 'active' : '')} onClick={ () => setPage(true) }>
                    <i className='fa fa-save' />&nbsp;Cadastrar produto
                </Button>
                <Button className={(!page ? 'active' : '')} style={{ marginLeft: '10px' }} onClick={ () => setPage(false ) }>
                    <i className='fa fa-upload' />&nbsp; Actualizar dados de produto
                </Button>
            </Col>
            <Card className='shadow rounded col-12 mt-2'>
                <Card.Body className=''>
                    <Form id={page ? 'FormAddProduct' : 'FormUpdateProduct'} className="animation row d-flex align-items-stretch" onSubmit={
                        (evt) => handleSubmit(evt)
                    }>
                        <Row>
                            <Col lg={12} className="text-center">
                                {page ?
                                    <strong>Cadastrar dados de Produtos</strong>
                                    :''}
                                {!page ?
                                    <strong>Actualizar dados de Produtos</strong>
                                    : ''}
                            </Col>
                        </Row>

                        <Row className="col-4">
                            <Col lg={12}><pre className="text-center"><i>Descrição</i></pre></Col>
                            {!page ?
                                <Col>
                                    <FormLabel className="text-center" htmlFor="product_id">Selecione o produto ou
                                        serviço</FormLabel>
                                    <FormSelect id="product_id">
                                        { ListOfProducts(products) }
                                    </FormSelect>
                                </Col>
                                :''}
                            {/*{page ?*/}
                            <Col lg={12}>
                                <FormLabel htmlFor="productName">Nome do produto</FormLabel>
                                <FormControl id="productName" required/>
                            </Col>
                            {/*:''}*/}
                            <Col lg={12}>
                                <FormLabel htmlFor="description">Descrição</FormLabel>
                                <FormControl id="description"/>
                            </Col>
                            {page ?
                                <Col lg={12}>
                                    <FormLabel htmlFor="code">Código</FormLabel>
                                    <FormControl id="code"/>
                                </Col>
                                : ''}
                            {page ?
                                <Col lg={12}>
                                    <FormLabel htmlFor="product_type">Tipo de Artigo</FormLabel>
                                    <FormSelect id="product_type">
                                        <option value="1">Produto</option>
                                        <option value="2">Serviço</option>
                                    </FormSelect>
                                </Col>
                                : ''}
                            <Col lg={12}>
                                <FormLabel htmlFor="for_sale_status">Pronto para venda</FormLabel>
                                <FormSelect id="for_sale_status">
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </FormSelect>
                            </Col>
                        </Row>

                        {/*Quotation*/}

                        <Row className="col-4">
                            <Col lg={12}><pre className="text-center"><i>Cotação</i></pre></Col>
                            <Col lg={page ? 12 : 12}>
                                <FormLabel htmlFor="price">Preço</FormLabel>
                                <FormControl type="number" id="price" onChange={
                                    (evt) => setPrice(+evt.target.value)
                                } required/>
                            </Col>
                            <Col lg={12}>
                                <FormLabel htmlFor="price_with_tax">Preço com imposto</FormLabel>
                                <FormControl type="number" value={ priceWithTax } id="price_with_tax" disabled/>
                            </Col>
                            <Col lg={12}>
                                <label htmlFor="stock_quantity">Quantidade</label>
                                <FormControl type="number" id="stock_quantity" required/>
                            </Col>
                            <Col lg={page ? 12 : 12}>
                                <FormLabel htmlFor="unity_quantity">Unidade</FormLabel>
                                <FormControl type="number" id="unity_quantity" required/>
                            </Col>
                            {page ?
                                <Col lg={12}>
                                    <FormLabel htmlFor="unity_of_measure">Pagamento por: </FormLabel>
                                    <FormSelect id="unity_of_measure">
                                        <option value={ UnitOfMeasures.UN }>Por unidade, Unitário</option>
                                        <option value={ UnitOfMeasures.KG }>Por kilograma, Kilo</option>
                                        <option value={ UnitOfMeasures.HH }>Por hora</option>
                                    </FormSelect>
                                </Col>
                                :''}
                        </Row>

                        {/*TaxTypes*/}
                        <Row className="col-4">
                            <Col lg={12}><pre className="text-center"><i>Imposto</i></pre></Col>
                            <div className="col-12">
                                <FormLabel htmlFor="tax_value">Valor do imposto</FormLabel>
                                <FormControl type="number" className="form-control" id="tax_value" onChange={
                                    (evt) => setTaxValue(+evt.target.value)
                                } required/>
                            </div>
                            <Col lg={12}>
                                <FormLabel htmlFor="tax_total_added">Taxa adicionada</FormLabel>
                                <FormControl value={taxAdded} className="form-control" id="tax_total_added" disabled/>
                            </Col>
                            {taxValue === 0 || taxValue.toString().length === 0 ?
                                <>
                                    <Col lg={12}>
                                        <FormLabel htmlFor="tax_exemption_code">Código de isenção</FormLabel>
                                        <FormControl id="tax_exemption_code"/>
                                    </Col>
                                    <Col lg={12}>
                                        <FormLabel htmlFor="tax_exemption_reason">Motivo de isenção</FormLabel>
                                        <FormControl id="tax_exemption_reason"/>
                                    </Col>
                                </>
                                :
                                <Col lg={12}>
                                    <p>Para produtos/serviços isentos de imposto, deverá informar o motivo de isensão!</p>
                                </Col>
                            }
                            <Col lg={12}>
                                <FormLabel htmlFor="tax_id">Tipo de imposto</FormLabel>
                                <FormSelect id="tax_id">
                                    {taxValue === 0 || taxValue.toString().length === 0 ?
                                        <option value={ TaxTypes.ISE }>ISE - Isento sob termos</option>
                                        :   <>
                                            <option value={ TaxTypes.IVA } >IVA - Imposto sob valor acrescentado</option>
                                            <option value={ TaxTypes.IS  } >IS - Imposto de Selo</option>
                                            <option value={ TaxTypes.NS  } >NS - Não sujeição</option>
                                            <option value={ TaxTypes.OUT }  >OUT - Outros</option>
                                        </>
                                    }
                                </FormSelect>
                            </Col>
                        </Row>
                    <Row className=''>
                        <Col lg={12} className='pt-2'>
                            <Button type="submit" className="btn-primary float-end">
                                {page ?
                                    <><i className='fa fa-save'/> Salvar</>
                                    :
                                    <><i className='fa fa-upload'/> Actualizar</>
                                }
                            </Button>
                        </Col>
                    </Row>
                </Form>
                </Card.Body>
            </Card>
        </>
    );
}
