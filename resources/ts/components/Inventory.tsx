import "./SearchProduct";
import React from "react";
import {InventoryTemplate} from "../templates/InventoryTemplate";



export class Inventory extends React.Component {
    // private template: HTMLTemplateElement;


    constructor(props: object) {
        super(props);
    }

    componentDidMount() {
        this.createProduct();
        this.updateProduct();
        this.deleteProduct();
    }

     createProduct ()  {
        // const elem = document.getElementById('add-product')! as HTMLFormElement;
        // elem.addEventListener('submit',   async ev  => {
        //     ev.preventDefault();
        //
        //     let form = new FormData();
        //
        //     form.append('name', elem.productName.value );
        //     form.append('description', elem.description.value );
        //     form.append('ref_code', elem.ref_code.value );
        //     form.append('product_type', elem.product_type.value );
        //     form.append('sale_type', elem.saleType.value );
        //     form.append('price', elem.price.value );
        //     form.append('quantity', elem.quantity.value );
        //     form.append('unity', elem.unity.value );
        //     form.append('storage', elem.storage.value );
        //     form.append('exemption_code', elem.exemption_code.value );
        //     form.append('exemption_reason', elem.exemption_reason.value );
        //     form.append('tax_value', elem.tax_value.value );
        //     form.append('tax_id', elem.tax_id.value );
        //
        //     Preloader.active();
        //     console.log(elem);
        //     try {
        //         const {data, status } = await axios.post('products', form);
        //
        //         Preloader.inactive();
        //         console.log(data);
        //         console.log(status);
        //         MessageBox.openModal('Produto cadastrado!');
        //     }catch (err) {
        //         MessageBox.openModal('Não foi possível cadastrar o produto!');
        //         Preloader.inactive();
        //         console.log(err);
        //     }
        // });

    }

    updateProduct () {
        // const elem = document.getElementById('update-product-form')! as HTMLFormElement;
        // elem.addEventListener('submit', async ev => {
        //     ev.preventDefault();
        //     const dataPost = {
        //         name: elem._name.value,
        //         description: elem._description.value,
        //         ref_code: elem._ref_code.value,
        //         product_type: elem._product_type.value,
        //         sale_type: elem._saleType.value,
        //         price: elem._price.value,
        //         quantity: elem._quantity.value,
        //         unity: elem._unity.value,
        //         storage: elem._storage.value,
        //         exemption_code: elem._exemption_code.value,
        //         exemption_reason: elem._exemption_reason.value,
        //         tax_value: elem._tax_value.value,
        //         tax_id: elem._tax_id.value,
        //     }
        //
        //     Preloader.active();
        //     try {
        //         let { data } = await axios(
        //             {
        //                 url: 'products/' + elem.product_id.value,
        //                 method: 'patch',
        //                 data: JSON.stringify(dataPost),
        //                 headers: {
        //                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        //                 }
        //             });
        //
        //         MessageBox.openModal('Produto actualizado');
        //         Preloader.inactive();
        //         console.log(data);
        //     } catch (e) {
        //         MessageBox.openModal('Não foi possível actualizar!');
        //         Preloader.inactive();
        //         console.log(e);
        //     }
        // });
    }

    deleteProduct  = () => {
        // const formDeleteProductInput = document.getElementById('listed_search_product')! as HTMLElement;
        // formDeleteProductInput.addEventListener('submit', async ev => {
        //     ev.preventDefault();
        //     const event: { querySelector: Function } = ev.target as HTMLElement;
        //     const id = event.querySelector('button').value;
        //     try{
        //         await axios.delete('products/' + id);
        //         const removeRow = document.querySelector('div#I' + id);
        //         removeRow?.remove();
        //
        //         MessageBox.openModal('Cadastrado com sucesso!');
        //     }catch (e) {
        //         console.log(e);
        //         MessageBox.openModal('Ocorreu um erro, produto ou serviço não Eliminado!');
        //     }
        //
        // });
    }

    render () {
        return <InventoryTemplate />
    }
}
