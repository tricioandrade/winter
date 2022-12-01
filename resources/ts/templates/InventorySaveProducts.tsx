import React from "react";
import {Col, Form, FormLabel, FormSelect, Row} from "react-bootstrap";



export const InventorySaveProducts = () => {


    const saveProducts = (ev: Event | any) => {
        ev.preventDefault();
        console.log(ev.target);
    }


    return (
            <Form id="FormAddProduct" className="row animation" onSubmit={saveProducts}>
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
                        <label htmlFor="ref_code">Código</label>
                        <input type="text" className="form-control" id="ref_code"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="product_type">Tipo de Artigo</label>
                        <select className="form-control" id="product_type">
                            <option value="P">Produto</option>
                            <option value="S">Serviço</option>
                        </select>
                    </div>
                </Row>

                <Row className="col-3 ">
                    <Col lg={12}><pre className="text-center"><i>Cotação</i></pre></Col>
                    <div className="col-12">
                        <label htmlFor="price">Preço</label>
                        <input type="number" className="form-control" id="price" required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="quantity">Quantidade</label>
                        <input type="number" className="form-control" id="quantity" required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="unity">Unidade</label>
                        <input type="number" className="form-control" id="unity" required/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="storage">Armazém</label>
                        <input type="text" className="form-control" id="storage"/>
                    </div>
                </Row>


                <Row className="col-3">
                    <Col lg={12}><pre className="text-center"><i>Isenção de imposto</i></pre></Col>
                    <Col lg={12}>
                        <FormLabel htmlFor="saleType">Pagamento por: </FormLabel>
                        <FormSelect id="saleType">
                            <option value="KG">Por kilograma, Kilo</option>
                            <option value="UN">Por unidade, Unitário</option>
                            <option value="HH">Por hora</option>
                        </FormSelect>
                    </Col>
                    <Col lg={12}>
                        <label htmlFor="exemption_code">Código de isenção</label>
                        <input type="text" className="form-control" id="exemption_code"/>
                    </Col>
                    <Col lg={12}>
                        <label htmlFor="exemption_reason">Motivo de isenção</label>
                        <input type="text" className="form-control" id="exemption_reason"/>
                    </Col>
                </Row>
                <Row className="col-3">
                    <Col lg={12}><pre className="text-center"><i>Imposto</i></pre></Col>
                    <div className="col-12">
                        <label htmlFor="tax_value">Valor do imposto</label>
                        <input type="number" className="form-control" id="tax_value"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="tax_id">Tipo de imposto</label>
                        <select className="form-control" id="tax_id">
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
