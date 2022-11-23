const _ = `
        <div class="col-12" id="account-footer">
            <div class="col-12 pt-0 m-0">
                <form class="row p-4 pt-0 pb-0">
                    <div class="col-12 p-0 text-end">
                        <label for="total">Total</label>
                        <input style="font-size: 1.6rem"
                         type="number" disabled class="form-control border-0 bg-transparent text-end rounded-0" placeholder="0.00" id="totalValue">
                    </div>
                    <div class="col-6 p-0 text-end">
                        <label for="paidValue">Valor pago</label>
                        <input type="number" step="0,1" class="form-control text-end rounded-0" placeholder="0,00" id="paidValue">
                    </div>
                    <div class="col-6 p-0 text-end">
                        <label for="change">Troco</label>
                        <input type="number" class="form-control text-end rounded-0 border-0" placeholder="0,00" id="change"
                               disabled>
                    </div>
                </form>
            </div>
        </div>
    `;

export default _;
