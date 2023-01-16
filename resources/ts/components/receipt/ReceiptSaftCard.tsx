import React from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';

const ReceiptSaftCard = () => {
    return (
        <Card className="shadow rounded">
            <Card.Body>
                <h5 className="card-title">Exportar  Saf-T</h5>
                <p className="card-text">Exportação do ficheiro Saf-T</p>
            </Card.Body>
            <Card.Footer className="">
                <Col lg={12}>
                    <Form className="row" id="saftExportFormDate">
                        <div className="col mt-2">
                            <Form.Label htmlFor="safTDate">Escolha um dia!</Form.Label>
                            <Form.Select className='form-control' id="safTDate">
                            </Form.Select>
                            <Button type="submit" className="btn btn-primary mt-2">Exportar</Button>
                        </div>
                    </Form>
                </Col>
                <Col lg={12}>
                    <Form className="row" id="saftExportFormYear">
                        <div className="col mt-2">
                            <Form.Label htmlFor="safTYear">Selecione um ano</Form.Label>
                            <Form.Select className='form-control' id="safTYear" />
                            <Button type="submit" className="btn btn-primary mt-2">Exportar</Button>
                        </div>
                    </Form>
                </Col>
                <Col lg={12}>
                    <Form className="row" id="saftExportFormMonth">
                        <div className="col mt-2">
                            <Form.Label htmlFor="safTMonth">Selecione o mês!</Form.Label>
                            <Form.Select className='form-control' id="safTMonth">
                            </Form.Select>
                            <Button type="submit" className="btn btn-primary mt-2">Exportar</Button>
                        </div>
                    </Form>
                </Col>
            </Card.Footer>
        </Card>
    )
}

export default ReceiptSaftCard;