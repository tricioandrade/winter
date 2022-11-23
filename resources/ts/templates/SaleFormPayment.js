const SaleFormPayment = () => {
    return `
    <div class="col-12 card p-2 shadow rounded m-1  p-2">
        <form id="payment_ways" class="form-venda-de-produtos">
            <div class="col-12">
                <select class="form-select" id="payment-ways" aria-label="Formas de pagamento">
                    <option selected>Pronto pagamento</option>
                </select>
            </div>
        </form>
    </div>

    <div class="col-12 card p-2 shadow rounded m-1  p-2">
        <form>
            <div class="col-12">
                <select class="form-select" id="payment_mechanism" aria-label="Formas de pagamento">
                    <option value="NU" selected>Numerário</option>
                    <option value="CC" >Cartão de Crédito</option>
                    <option value="CB" >Cheque Bancário</option>
                    <option value="OU" >Outros Meios</option>
                </select>
            </div>
        </form>
    </div>
    `;
}

export default SaleFormPayment;
