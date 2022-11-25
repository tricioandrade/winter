
export function CreditNoteInput() {
    const box = document.getElementById('creditNoteInput');

    const remove = () => {
        document.querySelector('#creditNoteInput .close').addEventListener('click', () => {
            document.getElementById('creditNoteInput-modal').classList.remove('active');
        });
    }

    box.innerHTML =  `<div id="creditNoteInput-modal" class="modal active" tabindex="-2">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Por favor informe o numro da factura</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="creditNoteForm">
                                <div class="col">
                                    <label for="invoice_changed_ref">Numero da factura</label>
                                    <input type="text" id="invoice_changed_ref" class="form-control">
                                </div>

                                <button type="submit" id="NC" class="btn btn-primary" data-bs-dismiss="modal">Concluir</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn close btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
               </div>
             </div>
            `;

    remove();
}
