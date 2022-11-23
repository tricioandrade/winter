import axios from "../api/axios";
import MessageBox from "./MessageBox";
import Preloader from "./Preloader";
import searchProductCard from "../templates/searchProductCard";
import searchProductTemplate from "../templates/searchProductTemplate";

class SearchProduct extends HTMLElement{

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const template = document.createElement('template');
            template.innerHTML = searchProductTemplate;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        console.log(template);
    }

    connectedCallback() {
        if (this.isConnected){
            this.searchProducts();
        }
    }

    searchProducts () {
        const formSearch = document.getElementById('product-search') as HTMLFormElement;
        formSearch.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            Preloader.active();

            const list = this.shadowRoot?.querySelector('#listed_search_product')!;
            try {
                const param: string | undefined = formSearch.productSearchInput.value ?? undefined;
                let response = param ? await axios.get('products/') : await axios.get('products/' + param);

                let { data } = response;
                console.log(response);
                list.innerHTML = searchProductCard(data.data);
            }catch (err){
                Preloader.inactive();
                MessageBox.openModal('Erro na busca de produtos, talvez deva cadastrar primeiro ');
                console.log(err) ;
            }
        });
    }
}

customElements.define('search-product', SearchProduct);
