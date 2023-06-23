import {UserFormAddUser} from "./UserFormAddUser";
import UsersTableRows from "../../tasks/UsersTableRows";
import {UserUpdateUser} from "./UserUpdateUser";
import {UserTableOfUsers} from "./UserTableOfUsers";
import Preloader from "../../tasks/Preloader";
import axios from "../../api/axios";
import qs from "qs";
import UsersList from "./UsersList";
import MessageBox from "./MessageBox";
import {UsersFormAddCompanyInfo} from "./UsersFormAddCompanyInfo";
import UserCompanyInfo from "./UserCompanyInfo";
import ChangeUserPassword from "../../tasks/ChangeUserPassword";


class Users {

    constructor() {
        this.users = [];
    }

    main = () => {

        this.listUsers();
        this.addUser();
        this.companyInfo();
        this.saveCompany();
    }

    companyInfo = async () => {
        try {
            const response = await axios.get('company-info/');
            console.log(response);
            UserCompanyInfo(response.data.data);
        }catch (e) {
            console.log(e);
        }

    }

    saveCompany = () => {

        const company = document.getElementById('AddCompany');
        company.addEventListener('submit', async ev => {

            ev.preventDefault();
            let form = new FormData();
            form.append('name',company.name_company.value);
            form.append('email',company.email_company.value);
            form.append('address',company.address_company.value);
            form.append('fulladdress',company.full_address_company.value);
            form.append('nif',company.nif.value);
            form.append('port',company.door.value);
            form.append('street',company.street.value);
            form.append('country',company.country.value);
            form.append('city',company.city.value);
            form.append('phone',company.phone_company.value);

            Preloader().active();
            try {
                const response = await axios.post('/company', form);
                MessageBox('Informação salva');
                this.companyInfo(response.data.data);
                Preloader().remove();
            }catch (e) {
                console.log(e);
                MessageBox('Erro, não foi possível salvar os dados');

                Preloader().remove();
            }
        });

    }

    listUsers = async () => {



        try {
            Preloader().active();
            const response = await axios.get('users/list');

            UsersTableRows(response.data);
            // UsersList(response.data);
            this.deleteUser();
            Preloader().remove();

        }catch (e) {
            console.log(e);
            Preloader().remove();
        }

    }


    addUser = () => {

        let add = document.getElementById('AddUser');
        console.log(add);
        add.addEventListener('submit', async ev => {
            ev.preventDefault();
            const form = new FormData();

            form.append('name', add.name.value);
            form.append('email', add.email.value);
            form.append('password', add.password.value);
            form.append('password_confirmation', add.password_confirmation.value);

            form.append('admin', add.admin.value);

            try{
                const response = await  axios.post('users/', form);
                console.log(response);
                MessageBox('Usuário adicionado')
                this.listUsers();

            }catch (e) {
                console.log(e)
            }

        });
    }


    updateUser = () => {

        let userUpdate = document.getElementById('UpdateUser');
        userUpdate.addEventListener('submit', async ev => {
            ev.preventDefault();
            const form = new FormData();

            form.append('name', userUpdate.__name.value);
            form.append('email', userUpdate.__email.value);
            form.append('password', userUpdate.__password.value);
            form.append('password_confirmation', userUpdate.__password_confirmation.value);

            form.append('admin', userUpdate.__admin.value);

            try{
                let update = async () => await axios(
                    {
                        url:'users/' + userUpdate.UpdateID.value,
                        method: 'patch',
                        data: qs.stringify(form),
                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    });

                console.log(update);
            }catch (e) {
                console.log(e)
            }

        });
    }

    deleteUser = () => {

        let deleteUser = document.querySelector('table#UsersTable');
        console.log(deleteUser);

        deleteUser.addEventListener('submit', async ev => {
            ev.preventDefault();
            const id = ev.target?.querySelector('button').value;
            try{
                const response = await axios.delete('users/' + id);
                this.listUsers();
                document.querySelector('tr#U' + id).remove()
                MessageBox('Eliminado!');
            }catch (e) {
                console.log(e);
                MessageBox('Não Eliminado!');

            }

        });

    }

    render = () =>{
        return `
        <div class="container">
            <div class="row">
                <h4><i class="fa fa-users-cog"></i>Configurações de Usuários</h4>
            </div>
            <hr>
            <div class="row" style="height: 80vh; overflow: auto;">
                <div class="col-5 m-1 card p-2 shadow rounded ">
                    ${UserTableOfUsers()}
                </div>
                <div class="col-5 m-1 card p-2 shadow rounded ">
                    ${UserFormAddUser()}
                </div>
                <div class="col-4 m-1 card p-2 shadow rounded">
                    <div class="col text-center"><h3>Informações da empresa</h3></div>
                    <div class="col-12">
                        <table class="table table-striped-columns ">
                            <tbody id="CompanyInfo" class="list-group">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-6 m-1 card p-2 shadow rounded ">
                    ${ UsersFormAddCompanyInfo() }
                </div>
            </div>
        </div>
    `;
    }
}

export default Users;
