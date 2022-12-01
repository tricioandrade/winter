import React from "react";
import {Col, Form, Row} from "react-bootstrap";


const InventoryUpdateProduct = () => {



    return (
        <Form id="FormUpdateProduct" className="row g-3">
            <div className="col-12 text-center">
                <p>Atualizar dados de Produtos</p>
            </div>
            <Row className='col-12'>
                <Col>
                    <label className="text-center" htmlFor="product_id">Selecione o produto ou serviço</label>
                    <select className="form-control product_list" id="product_id">
                    </select>
                </Col>
            </Row>
            <Row className="col-6">
                <small className="text-center p-2"><i>Descrição do artigo</i></small>
                <hr />
                <div className="col-12">
                    <label htmlFor="_name">Nome do produto</label>
                    <input type="text" className="form-control" id="_name"/>
                </div>
                <div className="col-12">
                    <label htmlFor="_description">Descrição</label>
                    <input type="text" className="form-control" id="_description"/>
                </div>
                <div className="col-12">
                    <label htmlFor="_ref_code">Código</label>
                    <input type="text" className="form-control" id="_ref_code"/>
                </div>
                <div className="col-12">
                    <label htmlFor="_product_type">Tipo de Artigo</label>
                    <select className="form-control" id="_product_type">
                        <option value="P">Produto</option>
                        <option value="S">Serviço</option>
                    </select>
                </div>
            </Row>
            <Row className="col-6">
                <small className="text-center"><i>Cotação</i></small>
                <hr />
                <Col lg={12}>
                    <label htmlFor="_price">Preço</label>
                    <input type="number" className="form-control" id="_price"/>
                </Col>
                <Col lg={12} className="col-6">
                    <label htmlFor="_quantity">Quantidade</label>
                    <input type="number" className="form-control" id="_quantity"/>
                </Col>

                <Col lg={12}>
                    <label htmlFor="_unity">Unidade</label>
                    <input type="number" className="form-control" id="_unity"/>
                </Col>
                <Col lg={12}>
                    <label htmlFor="_storage">Armazém</label>
                    <input type="text" className="form-control" id="_storage"/>
                </Col>
            </Row>
            <Col lg={12} className='row'>
                <Col lg={12}>
                    <label htmlFor="_saleType">Pagamento por: </label>
                    <select className="form-control" id="_saleType">
                        <option value="KG">Por kilograma, Kilo</option>
                        <option value="UN">Por unidade, Unitário</option>
                        <option value="HH">Por hora</option>
                    </select>
                </Col>
            </Col>

            <Row className="col-12 ">
                <small className="text-center"><i>Isenção de imposto</i></small>
                <hr />
                <div className="col-5">
                    <label htmlFor="_exemption_code">Código</label>
                    <input type="text" className="form-control" id="_exemption_code"/>
                </div>
                <div className="col-7">
                    <label htmlFor="_exemption_reason">Motivo de isenção</label>
                    <input type="text" className="form-control" id="_exemption_reason"/>
                </div>
                <small>Insira aqui o código do motivo, e o motivo de isenção!</small>
            </Row>

            <Row className="col-12">
                <small className="text-center"><i>Imposto</i></small>
                <hr />
                <div className="col-5">
                    <label htmlFor="_tax_value">Valor do imposto</label>
                    <input type="number" className="form-control" id="_tax_value"/>
                </div>
                <div className="col-7">
                    <label htmlFor="_tax_id">Tipo de imposto</label>
                    <select className="form-control" id="_tax_id">
                        <option value="1">IVA &horbar; Imposto sob valor acrescentado</option>
                        <option value="2">ISE &horbar; Isento sob termos</option>
                        <option value="3">IS &horbar; Imposto de Selo</option>
                        <option value="4">NS &horbar; Não sujeição</option>
                        <option value="5">OUT &horbar; Outros</option>
                    </select>
                </div>
            </Row>
            <button type="submit" className="btn float-end btn-primary mb-3">Actualizar</button>
        </Form>
    );
}

export default InventoryUpdateProduct;
