import Preloader from "../tasks/Preloader";

const searchProductCard = (arr: any[]) => {
    let products = ``;
    const e = <T extends object> (p: T | any) => {
        products += `
                    <div id="I${p.id}" class="col-4 m-2 card">
                        <div class="card-body">
                            <ul class="list-group">
                                <li class='list-item'>Nome: <span class="float-end">${p.attributes.name}</span></li>
                                <li class='list-item'>Descrição: <span class="float-end">${p.attributes.description}</span></li>
                                <li class='list-item'>Tipo de Artigo: <span class="float-end">${p.attributes.product_type === 'S' ? 'Serviço' : ''}</span></li>
                                <li class='list-item'>Preço Original: <span class="float-end">${p.attributes.price}</span></li>
                                <li class='list-item'>Preço com imposto: <span class="float-end">${p.attributes.price_tax}</span></li>
                                <li class='list-item'>Taxa de imposto adicionada: <span class="float-end">${p.attributes.tax_added}</span></li>
                                <li class='list-item'>Quantidade em stock: <span class="float-end">${p.attributes.quantity}</span></li>
                                <li class='list-item'>Unidade: <span class="float-end">${p.attributes.unity}</span></li>
                                <li class='list-item'>Valor do imposto: <span class="float-end">${p.attributes.tax_value}</span></li>
                                <li class='list-item'>Códido gerado: <span class="float-end">${p.attributes.generated_code}</span></li>
                                <li class='list-item'>Código: <span class="float-end">${p.attributes.ref_code}</span></li>
                                <li class='list-item'>Armazem: <span class="float-end">${p.attributes.storage}</span></li>
                                <li class='list-item'>Motivo de Isenção: <span class="float-end">${p.attributes.exemption_reason}</span></li>
                                <li class='list-item'>Código de Isenção: <span class="float-end">${p.attributes.exemption_code}</span></li>
                                <li class='list-item'>Imposto: <span class="float-end">${p.relationships.tax.name}</span></li>
                                <li class='list-item'>Nome do imposto: <span class="float-end">${p.relationships.tax.tax_name}</span></li>
                                <li class='list-item'>Descrição do imposto<span class="float-end">${p.relationships.tax.tax_description}</span></li>
                                <li class='list-item'>Usuário que cadastrou: <span class="float-end">${p.relationships.user.name}</span></li>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <form>
                                <button type="submit" value="${p.id}" class="btn btn-danger">Apagar Produto</button>
                            </form>
                        </div>
                    </div>
                `;
    }

    if (arr[0]) arr.map( iter => { e(iter) });
    else e(arr);

    Preloader.inactive();
    return products;
}


export default searchProductCard;
