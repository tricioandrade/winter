import axios from "../api/axios";
import MessageBox from "../tasks/MessageBox";
import Preloader from "./Preloader";
import {buildTemplate} from "../tasks/buildTemplate";
import {renderTemplate} from "../tasks/renderTemplate";
import inventoryTemplate from "../templates/inventoryTemplate";


class Inventory extends HTMLElement{
    private template: HTMLTemplateElement;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.template = buildTemplate('div', inventoryTemplate);
        this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
        console.log(this.template);
    }

    connectedCallback() {
        if (this.isConnected){
            this.createProduct();
        }
        else{
            Inventory.render()
        }
    }

     createProduct ()  {
        const elem = document.getElementById('add-product')! as HTMLFormElement;
        elem.addEventListener('submit',   async ev  => {
            ev.preventDefault();

            let form = new FormData();

            form.append('name', elem.productName.value );
            form.append('description', elem.description.value );
            form.append('ref_code', elem.ref_code.value );
            form.append('product_type', elem.product_type.value );
            form.append('sale_type', elem.saleType.value );
            form.append('price', elem.price.value );
            form.append('quantity', elem.quantity.value );
            form.append('unity', elem.unity.value );
            form.append('storage', elem.storage.value );
            form.append('exemption_code', elem.exemption_code.value );
            form.append('exemption_reason', elem.exemption_reason.value );
            form.append('tax_value', elem.tax_value.value );
            form.append('tax_id', elem.tax_id.value );

            Preloader.active();
            console.log(elem);
            try {
                const {data, status } = await axios.post('products', form);

                Preloader.inactive();
                console.log(data);
                console.log(status);
                MessageBox('Produto cadastrado!');
            }catch (err) {
                MessageBox('Não foi possível cadastrar o produto!');
                Preloader.inactive();
                console.log(err);
            }
        });

    }

    updateProduct () {
        const elem = document.getElementById('update-product-form')! as HTMLFormElement;
        elem.addEventListener('submit', async ev => {
            ev.preventDefault();
            const dataPost = {
                name: elem._name.value,
                description: elem._description.value,
                ref_code: elem._ref_code.value,
                product_type: elem._product_type.value,
                sale_type: elem._saleType.value,
                price: elem._price.value,
                quantity: elem._quantity.value,
                unity: elem._unity.value,
                storage: elem._storage.value,
                exemption_code: elem._exemption_code.value,
                exemption_reason: elem._exemption_reason.value,
                tax_value: elem._tax_value.value,
                tax_id: elem._tax_id.value,
            }

            Preloader.active();
            try {
                let update = await axios(
                    {
                        url: 'products/' + elem.product_id.value,
                        method: 'patch',
                        data: JSON.stringify(dataPost),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    });

                MessageBox('Produto actualizado');
                Preloader.inactive();
                console.log(update.data);
            } catch (e) {
                MessageBox('Não foi possível actualizar!');
                Preloader.inactive();
                console.log(e);
            }
        });
    }

    deleteProduct  = async () => {
        const formDeleteProductInput = document.getElementById('listed_search_product')! as HTMLElement;
        formDeleteProductInput.addEventListener('submit', async ev => {
            ev.preventDefault();
            const event: { querySelector: Function } = ev.target as HTMLElement;
            const id = event.querySelector('button').value;
            try{
                await axios.delete('products/' + id);
                const removeRow = document.querySelector('div#I' + id);
                removeRow?.remove();

                MessageBox('O produto foi deletado!');
            }catch (e) {
                console.log(e);
                MessageBox('Ocorreu um erro, produto ou serviço não Eliminado!');
            }

        });
    }

    searchProducts = () => {
        const formSearch = document.getElementById('product-search');
        formSearch.addEventListener('submit', async (ev) => {
           ev.preventDefault();
            Preloader.active();
            try {
                if(formSearch.productSearchInput.value){
                    let response = await axios.get('products/'+ formSearch.productSearchInput.value);
                    let products = response.data.data.data;
                    console.log(products);
                    InventoryProductCard(products);
                }
                else {
                    let response = await axios.get('products/');
                    let products = response.data.data.data;
                    console.log(response);
                    InventoryProductCard(products);
                }

            }catch (err){
                console.log(err) ;
                Preloader.inactive();
                MessageBox('Erro na busca de produtos, talvez deva cadastrar primeiro') }

        });
    }

    static render () {
        renderTemplate(document.createElement('inventory-page'));
    }
}

export default Inventory;
