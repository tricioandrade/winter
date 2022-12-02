import React, {FormEvent, useEffect, useState} from "react";
import {Col, Form, FormControl, FormLabel, FormSelect, Row} from "react-bootstrap";
import CalculatorTrait from "../traits/CalculatorTrait";
import {Tax} from "../interfaces/TaxTypes";
import MessageBox from "../traits/MessageBox";
import ProductsRequests from "../requests/ProductsRequests";

export const InventorySaveProducts = () => {

    const [taxValue, setTaxValue] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [priceWithTaxValue, setPriceWithTaxValue] = useState<number>(0);
    const [taxAddedValue, setTaxAddedValue] = useState<number>(0);


    useEffect( () => {
        const { priceWithTax, taxAdded } = CalculatorTrait.calculatePriceTax({
            price,
            taxValue,
            discount: 0
        });

        setPriceWithTaxValue(+priceWithTax);
        setTaxAddedValue(+taxAdded);

    }, [price, taxValue]);


    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        const elem = evt.target as HTMLFormElement;
        const form = new FormData();

        form.append('name', elem.productName.value );
        form.append('description', elem.description.value );
        form.append('code', elem.code.value );
        form.append('product_type', elem.product_type.value );
        form.append('sale_type', elem.saleType.value );
        form.append('price', elem.price.value );
        form.append('price_with_tax', elem.price_with_tax.value );
        form.append('stock_quantity', elem.stock_quantity.value );
        form.append('unity_quantity', elem.unity_quantity.value );
        form.append('for_sale_quantity', elem.for_sale_quantity.value );
        form.append('for_sale_status', elem.for_sale_status.value );
        form.append('unity_of_measure', elem.for_sale_status.value );
        form.append('storage_id', elem.storage_id.value );
        form.append('tax_exemption_code', elem.tax_exemption_code.value );
        form.append('tax_exemption_reason', elem.tax_exemption_reason.value );
        form.append('tax_value', elem.tax_value.value );
        form.append('tax_total_added', elem.tax_total_added.value );
        form.append('tax_type_id', elem.tax_id.value );
        const taxId: number = +elem.tax_type_id;

        if (taxId === Tax.ISE && elem.tax_value !== 0) {
            MessageBox('O valor do imposto tem de ser 0');
            return;
        }

        if (taxId === Tax.IVA || taxId === Tax.IS || taxId === Tax.OUT || taxId === Tax.NS && +elem.tax_value <= 0) {
            MessageBox('O valor do imposto tem de ser maior que 0');
            return;
        }

        ProductsRequests.saveProduct(form).then(data => {
            console.log(data);
        }).catch( err => {
            console.log(err);
        });
    }


    return (
            <Form id="FormAddProduct" className="row animation" onSubmit={
                (evt) => handleSubmit(evt)
            }>
                <div className="col-12 text-center">
                    <strong>Cadastrar dados de Produtos</strong>
                </div>
                <Row className="col-3">
                    <Col lg={12}><pre className="text-center"><i>Descrição do artigo</i></pre></Col>
                    <div className="col-12">
                        <label htmlFor="name">Nome do produto</label>
                        <input type="text" className="form-control" id="name" required/>
                    </div>

                    <div className="col-12">
                        <label htmlFor="description">Descrição</label>
                        <input type="text" className="form-control" id="description"/>
                    </div>

                    <div className="col-12">
                        <label htmlFor="code">Código</label>
                        <input type="text" className="form-control" id="code"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="product_type">Tipo de Artigo</label>
                        <select className="form-control" id="product_type">
                            <option value="P">Produto</option>
                            <option value="S">Serviço</option>
                        </select>
                    </div>
                    <Col lg={12}>
                        <FormLabel htmlFor="for_sale_status">Pronto para venda</FormLabel>
                        <FormSelect id="for_sale_status">
                            <option value="yes">Sim</option>
                            <option value="no">Não</option>
                        </FormSelect>
                    </Col>
                </Row>

                {/*Quotation*/}

                <Row className="col-3 ">
                    <Col lg={12}><pre className="text-center"><i>Cotação</i></pre></Col>
                    <Col lg={12}>
                        <FormLabel htmlFor="price">Preço</FormLabel>
                        <FormControl type="number" className="form-control" id="price" onChange={
                            (evt) => setPrice(+evt.target.value)
                        } required/>
                    </Col>
                    <Col lg={12}>
                        <FormLabel htmlFor="price_with_tax">Preço com imposto</FormLabel>
                        <FormControl type="number" value={priceWithTaxValue} className="form-control" id="price_with_tax" disabled/>
                    </Col>
                    <div className="col-12">
                        <label htmlFor="stock_quantity">Quantidade</label>
                        <input type="number" className="form-control" id="stock_quantity" required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="unity_quantity">Unidade</label>
                        <input type="number" className="form-control" id="unity_quantity" required/>
                    </div>
                    <Col lg={12}>
                        <FormLabel htmlFor="unity_of_measure">Pagamento por: </FormLabel>
                        <FormSelect id="unity_of_measure">
                            <option value="KG">Por kilograma, Kilo</option>
                            <option value="UN">Por unidade, Unitário</option>
                            <option value="HH">Por hora</option>
                        </FormSelect>
                    </Col>
                </Row>


                <Row className="col-3">
                    <Col lg={12}><pre className="text-center"><i>Imposto</i></pre></Col>
                    <div className="col-12">
                        <label htmlFor="tax_value">Valor do imposto</label>
                        <input type="number" className="form-control" id="tax_value" onChange={
                            (evt) => setTaxValue(+evt.target.value)
                        } required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="tax_total_added">Taxa do imposto adicionada</label>
                        <input type="text" value={taxAddedValue} className="form-control" id="tax_total_added" disabled/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="tax_type_id">Tipo de imposto</label>
                        <select className="form-control" id="tax_type_id">
                            <option value="1">IVA - Imposto sob valor acrescentado</option>
                            <option value="2">ISE - Isento sob termos</option>
                            <option value="3">IS - Imposto de Selo</option>
                            <option value="4">NS - Não sujeição</option>
                            <option value="5">OUT - Outros</option>
                        </select>
                    </div>
                    <Col lg={12}>
                        <label htmlFor="tax_exemption_code">Código de isenção</label>
                        <input type="text" className="form-control" id="tax_exemption_code"/>
                    </Col>
                    <Col lg={12}>
                        <label htmlFor="tax_exemption_reason">Motivo de isenção</label>
                        <input type="text" className="form-control" id="tax_exemption_reason"/>
                    </Col>
                </Row>
                <Row className="col-3">
                    <Col lg={12}></Col>
                    <Col lg={12}></Col>
                    <Col lg={12}></Col>
                    <Col lg={12}></Col>
                    <button type="submit" className="btn btn-sm btn-primary lh-1">Salvar</button>
                </Row>
            </Form>
    );
}
