import React from "react";
import {Card, Col, Form, FormControl, FormLabel} from "react-bootstrap";


export const SaleFormCreditNote = () => {

    return (
        <Col>
            <Card className="p-2 shadow rounded m-1  p-2">
                <Form id="creditNoteForm" className="">
                    <div className="col-12">
                        <FormLabel>Nota de crédito</FormLabel>
                        <FormControl inlist='changed_ref' />
                        <datalist id="changed_ref"></datalist>
                    </div>
                    <div className="col">
                        <FormLabel>Tipo de modificação</FormLabel>
                        <Form.Select id="type_of_change">
                            <option disabled>Selecione um tipo</option>
                            <option>Anulação</option>
                            <option>Retificação</option>
                        </Form.Select>
                    </div>
                </Form>
            </Card>
        </Col>
    )
};
