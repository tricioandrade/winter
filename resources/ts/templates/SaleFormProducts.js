const SaleFormProducts = () => {
    return `
        <div class="col-12 card p-2 shadow rounded m-1  p-2">
            <form id="sale-form-product" class="row g-3">
                <div class="col-12">
                    <label for="product-input">Produto ou Serviço</label>
                    <input class="form-control" list="productList" id="productInput" placeholder="Busque por produto..." />
                    <datalist id="productList"></datalist>
                </div>
                <div class="col-12">
                    <label for="quantity">Quantidade</label>
                    <input type="number" min="1" value="1" class="form-control" id="quantity" placeholder="Quantidade">
                </div>
<!--                     <div class="col-12">-->
<!--                        <label for="discount" class="form-label">Desconto</label>-->
<!--                        <input type="number" value="0" class="form-control" name="dicount" id="discount" required>-->
<!--                    </div>-->
                <div class="col-12">
                    <button type="submit" class="btn btn-primary mb-3">Adicionar</button>
                </div>
            </form>
        </div>
    `;
}

export default SaleFormProducts;
