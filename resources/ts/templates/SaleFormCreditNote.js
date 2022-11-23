const SaleFormCreditNote = () => {

    return `        <div class="col-12 card p-2 shadow rounded m-1  p-2">
                        <form id="creditNoteForm" class="">
                            <div class="col-12">
                                <label for="invoice_changed_ref">Nota de crédito</label>
                                <input id="invoice_changed_ref" list='changed_ref' class='form-control'>
                                <datalist id="changed_ref">
                                </datalist>
                            </div>
                             <div class="col">
                                    <label for="type_of_change">Tipo de modificação</label>
                                    <select id="type_of_change" class="form-control">
                                        <option disabled>Selecione um tipo</option>
                                        <option>Modificação parcial</option>
                                        <option>Modificação Completa</option>
                                    </select>
                                </div>
                        </form>
                    </div>
                `;
}


export default SaleFormCreditNote;
