export function UserUpdateUser() {

    return `
                <div class="card-body">
                <div class="col text-center"><h4>Actualizar dados do usuário</h4></div>
                    <form id="UpdateUser">
                        <div class="row mb-3">
                            <label for="UpdateID" class="col-md-4 col-form-label text-md-end">Selecione o usuário</label>
                            <div class="col-md-6">
                                <select id="UpdateID" class="form-control"></select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="name" class="col-md-4 col-form-label text-md-end">Nome</label>
                            <div class="col-md-6">
                                <input id="__name" type="text" class="form-control "  required autocomplete="name" autofocus>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">Email</label>

                            <div class="col-md-6">
                                <input id="__email" type="email" class="form-control "   required autocomplete="email">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="__admin" class="col-md-4 col-form-label text-md-end">Administrador? </label>
                            <div class="col-md-6">
                                <select id="__admin" class="form-control">
                                    <option value="A999">Sim</option>
                                    <option value="A000">Não</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">Adicionar</button>
                            </div>
                        </div>
                    </form>
                </div>
    `;
}
