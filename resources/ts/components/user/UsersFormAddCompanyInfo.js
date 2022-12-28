export  const UsersFormAddCompanyInfo = () => {


    return `
                <div class="col text-center"><h4>Empresa</h4></div>
                    <form id="AddCompany" class="row">
                        <div class="col-6">
                            <div class="row mb-3">
                                <label for="name_company" class="col-md-4 col-form-label text-md-end">Nome</label>
                                <div class="col-md-6">
                                    <input id="name_company" type="text" class="form-control "  required autocomplete="name" autofocus>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="email_company" class="col-md-4 col-form-label text-md-end">Email</label>

                                <div class="col-md-6">
                                    <input id="email_company" type="email" class="form-control "   required autocomplete="email">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="address_company" class="col-md-4 col-form-label text-md-end">Endereço</label>
                                <div class="col-md-6">
                                    <input id="address_company" type="text" class="form-control"  required autocomplete="new-address">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="full_address_company" class="col-md-4 col-form-label text-md-end">Endereço detalhado</label>
                                <div class="col-md-6">
                                    <input id="full_address_company" type="text" class="form-control"  required autocomplete="new-address">
                                </div>
                            </div>

                        </div>

                        <div class="col-6">
                            <div class="row mb-3">
                                <label for="nif" class="col-md-4 col-form-label text-md-end">Nif</label>
                                <div class="col-md-6">
                                    <input id="nif" type="text" class="form-control"  required autocomplete="new-address">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="door" class="col-md-4 col-form-label text-md-end">Porta</label>
                                <div class="col-md-6">
                                    <input id="door" type="text" class="form-control"  required autocomplete="new-address">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="street" class="col-md-4 col-form-label text-md-end">Rua</label>
                                <div class="col-md-6">
                                    <input id="street" type="text" class="form-control" >
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="country" class="col-md-4 col-form-label text-md-end">Pais</label>
                                <div class="col-md-6">
                                    <input id="country" type="text" class="form-control" value="Angola" >
                                </div>
                            </div>

                        </div>

                        <div class="col-12">

                            <div class="row mb-3">
                                <label for="city" class="col-md-4 col-form-label text-md-end">Cidade</label>
                                <div class="col-md-6">
                                    <input id="city" type="text" class="form-control" value="Luanda" required>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="phone_company" class="col-md-4 col-form-label text-md-end">Telefone</label>
                                <div class="col-md-6">
                                    <input id="phone_company" type="text" class="form-control" required>
                                </div>
                            </div>

                        </div>

                        <div class="row mb-0">
                            <div class="col-md-12 offset-md-4">
                                <button type="submit" class="btn btn-primary">Salvar</button>
                            </div>
                        </div>

                    </form>

    `;
}
