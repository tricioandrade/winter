
function UserCompanyInfo  (Company){
    let template = ``;

    Company.forEach((item) => {
        template += `

            <tr><th class="d-inline-flex col-4">Nome</th><td class="col-8 d-inline-flex">${item.name}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Nif</th><td class="col-8 d-inline-flex">${item.nif}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Porta</th><td class="col-8 d-inline-flex">${item.port}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Endereço</th><td class="col-8 d-inline-flex">${item.address}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Rua</th><td class="col-8 d-inline-flex">${item.street}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Endereço</th><td class="col-8 d-inline-flex">${item.fulladdress}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Cidade</th><td class="col-8 d-inline-flex">${item.city}</span></td></tr>
            <tr><th class="d-inline-flex col-4">País</th><td class="col-8 d-inline-flex">${item.country}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Email</th><td class="col-8 d-inline-flex">${item.email}</span></td></tr>
            <tr><th class="d-inline-flex col-4">Telefone</th><td class="col-8 d-inline-flex">${item.phone}</span></td></tr>
        `;
    });

    document.getElementById('CompanyInfo').innerHTML = template;
}

export default  UserCompanyInfo;
