
function ChangeUserPassword() {
    const changePass = document.getElementById('changePass');

    changePass.innerHTML =  `

                <style>
                    main{
                        visibility: hidden;
                    }
                </style>
                <div id="modal-password" class="modal active" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Alerta</h5>
                            </div>
                            <div class="modal-body">
                                <h6>
                                    Alteração da senha obrigatória após o primeiro início de sessão!
                                </h6>
                                <form id="ChangeUserPassword">
                                    <div class="row mb-3">
                                        <label for="password_confirmation" class="col-md-4 col-form-label text-md-end">Nova Senha: </label>
                                        <div class="col-md-6">
                                            <input id="changePassword" type="password" class="form-control" required minlength="8"
                                            maxlength="200" autocomplete="new-password">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary float-end">Alterar</button>
                                </form>
                            </div>
                        </div>
                    </div>
               </div>

            `;

}


export default ChangeUserPassword
