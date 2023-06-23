export function UserFormAddUser() {

    return `
                <div class="col text-center"><h4>Adicionar usuário</h4></div>
                    <form id="AddUser">
                        <div class="row mb-3">
                            <label for="name" class="col-md-4 col-form-label text-md-end">Nome</label>
                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control "  required autocomplete="name" autofocus>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">Email</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control "   required autocomplete="email">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">Senha</label>
                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control"  required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password_confirmation" class="col-md-4 col-form-label text-md-end">Confirmar Senha</label>
                            <div class="col-md-6">
                                <input id="password_confirmation" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="admin" class="col-md-4 col-form-label text-md-end">Administrador? </label>
                            <div class="col-md-6">
                                <select id="admin" class="form-control">
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
    `;
}
