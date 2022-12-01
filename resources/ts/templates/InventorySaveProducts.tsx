import React, {useEffect, useState} from "react";
import {Col, Form, FormControl, FormLabel, FormSelect, Row} from "react-bootstrap";



export const InventorySaveProducts = () => {

    const [taxTotal, setTaxTotal] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);


    useEffect( () => {
        

    }, [price, taxTotal]);

    // let taxAdded: number;
    // const price =
    // const getTaxValue = (evt: Event | any) => {
    //     const elem = evt.target as HTMLFormElement;
    //     const taxValue: number = +elem.tax_value.value;
    //
    //     setTaxTotal(taxValue)
    // };
    //
    // const saveProducts = (ev: Event | any) => {
    //     ev.preventDefault();
    //     console.log(ev.target);
    //
    //     let form = new FormData();
    //
    //     form.append('name', elem.productName.value );
    //     form.append('description', elem.description.value );
    //     form.append('code', elem.code.value );
    //     form.append('product_type', elem.product_type.value );
    //     form.append('sale_type', elem.saleType.value );
    //     form.append('price', elem.price.value );
    //     form.append('price_with_tax', elem.price_with_tax.value );
    //     form.append('stock_quantity', elem.stock_quantity.value );
    //     form.append('unity_quantity', elem.unity_quantity.value );
    //     form.append('for_sale_quantity', elem.for_sale_quantity.value );
    //     form.append('for_sale_status', elem.for_sale_status.value );
    //     form.append('unity_of_measure', elem.for_sale_status.value );
    //     form.append('storage_id', elem.storage_id.value );
    //     form.append('tax_exemption_code', elem.tax_exemption_code.value );
    //     form.append('tax_exemption_reason', elem.tax_exemption_reason.value );
    //     form.append('tax_value', elem.tax_value.value );
    //     form.append('tax_total_added', elem.tax_total_added.value );
    //     form.append('tax_type_id', elem.tax_id.value );
    // }


    return (
            <Form id="FormAddProduct" className="row animation" >
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
                        <FormControl type="number" value={priceWithTax} className="form-control" id="price_with_tax" disabled/>
                    </Col>
                    <div className="col-12">
                        <label htmlFor="stock_quantity">Quantidade</label>
                        <input type="number" className="form-control" id="stock_quantity" required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="for_sale_quantity">Quantidade para venda</label>
                        <input type="number" className="form-control" id="for_sale_quantity" required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="unity_quantity">Unidade</label>
                        <input type="number" className="form-control" id="unity_quantity" required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="storage_id">Armazém</label>
                        <input type="text" className="form-control" id="storage_id"/>
                    </div>
                </Row>


                <Row className="col-3">
                    <Col lg={12}><pre className="text-center"><i>Isenção de imposto</i></pre></Col>
                    <Col lg={12}>
                        <FormLabel htmlFor="unity_of_measure">Pagamento por: </FormLabel>
                        <FormSelect id="unity_of_measure">
                            <option value="KG">Por kilograma, Kilo</option>
                            <option value="UN">Por unidade, Unitário</option>
                            <option value="HH">Por hora</option>
                        </FormSelect>
                    </Col>
                    <Col lg={12}>
                        <FormLabel htmlFor="for_sale_status">Pronto para venda</FormLabel>
                        <FormSelect id="for_sale_status">
                            <option value="yes">Sim</option>
                            <option value="no">Não</option>
                        </FormSelect>
                    </Col>
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
                    <Col lg={12}><pre className="text-center"><i>Imposto</i></pre></Col>
                    <div className="col-12">
                        <label htmlFor="tax_value">Valor do imposto</label>
                        <input type="number" className="form-control" id="tax_value" onChange={getTaxValue} required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="tax_total_added">Taxa do imposto adicionada</label>
                        <input type="text" value={taxAdded} className="form-control" id="tax_total_added" disabled/>
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
                    <button type="submit" className="btn float-end btn-primary mb-3">Salvar</button>
                </Row>
            </Form>
    );
}
