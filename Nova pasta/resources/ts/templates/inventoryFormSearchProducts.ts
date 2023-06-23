const InventoryFormSearchProducts = `
         <div class="col-12">
            <form id="product-search" class="row d-flex lh-1 align-items-stretch">
                <div class="col-8 card d-flex p-2 shadow rounded align-baseline">
                    <label class="p-2" for="product-input">Produto ou Serviço</label>
                    <input class="form-control" list="productListSearch" id="productSearchInput" placeholder="Busque por produto..." />
                    <datalist class="product_list" id="productListSearch"></datalist>
                </div>
                <div class="col-4 d-flex">
                    <button type="submit" class="btn text-center"><i class="fa fa-search"></i></button>
                </div>
             </form>
         </div>
    `;


export default InventoryFormSearchProducts;
