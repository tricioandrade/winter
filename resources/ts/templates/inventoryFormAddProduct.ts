const InventoryFormAddProduct =  `
        <div class="col-5 card p-2 shadow rounded m-1">
           <div class="col-12">
                <h4>Cadastrar dados de Produtos</h4>
            </div>
            <div class="col-12">
                <form id="add-product" class="row g-3">
                   <div class="row col-12 card-body">
                        <small class="text-center" "><i>Descrição do artigo</i></small>
                        <hr>
                        <div class="col-6">
                            <label for="name">Nome do produto</label>
                            <input type="text" class="form-control" id="name"  required  />
                        </div>

                        <div class="col-6">
                            <label for="description">Descrição</label>
                            <input type="text" class="form-control" id="description"  />
                        </div>

                        <div class="col-6">
                            <label for="ref_code">Código</label>
                            <input type="text" class="form-control" id="ref_code"   />
                        </div>
                        <div class="col-6">
                            <label for="product_type">Tipo de Artigo</label>
                            <select class="form-control" id="product_type">
                                <option value="P">Produto</option>
                                <option value="S">Serviço</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label for="saleType">Pagamento por: </label>
                            <select class="form-control" id="saleType">
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
                            <label for="price">Preço</label>
                            <input type="number" class="form-control" id="price"   />
                        </div>
                        <div class="col-6">
                            <label for="quantity">Quantidade</label>
                            <input type="number" class="form-control" id="quantity" required  />
                        </div>

                        <div class="col-6">
                            <label for="unity">Unidade</label>
                            <input type="number" class="form-control" id="unity" required   />
                        </div>
                        <div class="col-6">
                            <label for="storage">Armazém</label>
                            <input type="text" class="form-control" id="storage"   />
                        </div>
                   </div>
                    <div class="row col-12  card-body">
                        <small class="text-center"><i>Isenção de imposto</i></small>
                       <hr>
                        <div class="col-5">
                            <label for="exemption_code">Código</label>
                            <input type="text" class="form-control" id="exemption_code"   />
                        </div>
                        <div class="col-7">
                            <label for="exemption_reason">Motivo de isenção</label>
                            <input type="text" class="form-control" id="exemption_reason"   />
                        </div>
                        <small>Insira aqui o código do motivo, e o motivo de isenção!</small>
                    </div>
                    <div class="row col-12 card-body">
                        <small class="text-center"><i>Imposto</i></small>
                        <hr>
                        <div class="col-5">
                            <label for="tax_value">Valor do imposto</label>
                            <input type="number" class="form-control" id="tax_value"   />
                        </div>
                        <div class="col-7">
                            <label for="tax_id">Tipo de imposto</label>
                            <select type="text" class="form-control" id="tax_id"   >
                                <option value="1">IVA &horbar; Imposto sob valor acrescentado</option>
                                <option value="2">ISE &horbar; Isento sob termos</option>
                                <option value="3">IS &horbar; Imposto de Selo</option>
                                <option value="4">NS &horbar; Não sujeição</option>
                                <option value="5">OUT &horbar; Outros</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn float-end btn-primary mb-3">Adicionar</button>
                </form>
            </div>
        </div>

    `;


export default InventoryFormAddProduct;
