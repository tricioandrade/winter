import React from "react";
import {Form, Row} from "react-bootstrap";



export const InventorySaveProducts = () => {


    return (
            <Form id="FormAddProduct" className="row g-3">
                <div className="col-12 text-center">
                    <p>Cadastrar dados de Produtos</p>
                </div>
                <Row className="col-6">
                    <small className="text-center"><i>Descrição do artigo</i></small>
                    <hr/>
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

                <Row className="col-6 ">
                    <small className="text-center"><i>Cotação</i></small>
                    <hr/>
                    <div className="col-12">
                        <label htmlFor="price">Preço</label>
                        <input type="number" className="form-control" id="price"/>
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

                <Row className="col-12">
                    <div className="col-12">
                        <label htmlFor="saleType">Pagamento por: </label>
                        <select className="form-control" id="saleType">
                            <option value="KG">Por kilograma, Kilo</option>
                            <option value="UN">Por unidade, Unitário</option>
                            <option value="HH">Por hora</option>
                        </select>
                    </div>
                </Row>

                <Row className="col-12 ">
                    <small className="text-center"><i>Isenção de imposto</i></small>
                    <hr/>
                    <div className="col-5">
                        <label htmlFor="exemption_code">Código</label>
                        <input type="text" className="form-control" id="exemption_code"/>
                    </div>
                    <div className="col-7">
                        <label htmlFor="exemption_reason">Motivo de isenção</label>
                        <input type="text" className="form-control" id="exemption_reason"/>
                    </div>
                    <small>Insira aqui o código do motivo, e o motivo de isenção!</small>
                </Row>
                <Row className="col-12">
                    <small className="text-center"><i>Imposto</i></small>
                    <hr/>
                    <div className="col-5">
                        <label htmlFor="tax_value">Valor do imposto</label>
                        <input type="number" className="form-control" id="tax_value"/>
                    </div>
                    <div className="col-7">
                        <label htmlFor="tax_id">Tipo de imposto</label>
                        <select className="form-control" id="tax_id">
                            <option value="1">IVA &horbar; Imposto sob valor acrescentado</option>
                            <option value="2">ISE &horbar; Isento sob termos</option>
                            <option value="3">IS &horbar; Imposto de Selo</option>
                            <option value="4">NS &horbar; Não sujeição</option>
                            <option value="5">OUT &horbar; Outros</option>
                        </select>
                    </div>
                </Row>
                <button type="submit" className="btn float-end btn-primary mb-3">Adicionar</button>
            </Form>
    );
}
