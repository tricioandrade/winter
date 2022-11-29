import React from "react";
import {Form, FormControl, FormLabel} from "react-bootstrap";


export const SaleFormCreditNote =
(<div className="col-12 card p-2 shadow rounded m-1  p-2">
        <Form id="creditNoteForm" className="">
            <div className="col-12">
                <FormLabel  >Nota de crédito</FormLabel>
                <FormControl inlist='changed_ref' className='form-control' />
                <datalist id="changed_ref"></datalist>
            </div>
             <div className="col">
                <label for="type_of_change">Tipo de modificação</label>
                <select id="type_of_change" className="form-control">
                    <option disabled>Selecione um tipo</option>
                    <option>Anulação</option>
                    <option>Retificação</option>
                </select>
            </div>
        </Form>
    </div>
);
