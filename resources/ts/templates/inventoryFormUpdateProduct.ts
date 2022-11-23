const InventoryFormAddProduct =  `
        <div class="col-5 card p-2 shadow rounded">
            <div class="col-12">
                <h4>Atualizar dados de Produtos</h4>
            </div>
            <div class="col-12">
                <form id="update-product-form" class="row g-3">
                   <div class="row col-12 card-body">
                        <div class="col-12">
                            <label class="text-center" for="product_id">Produto</label>
                            <select class="form-control product_list" id="product_id"   >
                           </select>
                        </div>
                        <small class="text-center" "><i>Descrição do artigo</i></small>
                        <hr>

                        <div class="col-6">
                            <label for="_name">Nome do produto</label>
                            <input type="text" class="form-control" id="_name" />
                        </div>

                        <div class="col-6">
                            <label for="_description">Descrição</label>
                            <input type="text" class="form-control" id="_description"/>
                        </div>

                        <div class="col-6">
                            <label for="_ref_code">Código</label>
                            <input type="text" class="form-control" id="_ref_code" />
                        </div>
                        <div class="col-6">
                            <label for="_product_type">Tipo de Artigo</label>
                            <select class="form-control" id="_product_type">
                                <option value="P">Produto</option>
                                <option value="S">Serviço</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label for="_saleType">Pagamento por: </label>
                            <select class="form-control" id="_saleType">
                                <option value="KG">Por kilograma, Kilo</option>
                                <option value="UN">Por unidade, Unitário</option>
                                <option value="HH">Por hora</option>
                            </select>
                        </div>
                   </div>
                   <div class="row col-12  card-body">
                        <small class="text-center"><i>Cotação</i></small>
                        <hr>
                        <div class="col-6">
                            <label for="_price">Preço</label>
                            <input type="number" class="form-control" id="_price" />
                        </div>
                        <div class="col-6">
                            <label for="_quantity">Quantidade</label>
                            <input type="number" class="form-control" id="_quantity"/>
                        </div>

                        <div class="col-6">
                            <label for="_unity">Unidade</label>
                            <input type="number" class="form-control" id="_unity" />
                        </div>
                        <div class="col-6">
                            <label for="_storage">Armazém</label>
                            <input type="text" class="form-control" id="_storage" />
                        </div>
                   </div>
                    <div class="row col-12  card-body">
                        <small class="text-center"><i>Isenção de imposto</i></small>
                       <hr>
                        <div class="col-5">
                            <label for="_exemption_code">Código</label>
                            <input type="text" class="form-control" id="_exemption_code" />
                        </div>
                        <div class="col-7">
                            <label for="_exemption_reason">Motivo de isenção</label>
                            <input type="text" class="form-control" id="_exemption_reason" />
                        </div>
                        <small>Insira aqui o código do motivo, e o motivo de isenção!</small>
                    </div>
                    <div class="row col-12 card-body">
                        <small class="text-center"><i>Imposto</i></small>
                        <hr>
                        <div class="col-5">
                            <label for="_tax_value">Valor do imposto</label>
                            <input type="number" class="form-control" id="_tax_value" />
                        </div>
                        <div class="col-7">
                            <label for="_tax_id">Tipo de imposto</label>
                            <select type="text" class="form-control" id="_tax_id"   >
                                <option value="1">IVA &horbar; Imposto sob valor acrescentado</option>
                                <option value="2">ISE &horbar; Isento sob termos</option>
                                <option value="3">IS &horbar; Imposto de Selo</option>
                                <option value="4">NS &horbar; Não sujeição</option>
                                <option value="5">OUT &horbar; Outros</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn float-end btn-primary mb-3">Actualizar</button>
                </form>
            </div>
        </div>
    `;


export default InventoryFormAddProduct;
