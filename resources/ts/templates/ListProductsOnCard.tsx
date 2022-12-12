import React, {FormEvent} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {ProductResource} from "../interfaces/ProductResource";
import ProductsRequests from "../requests/ProductsRequests";
import MessageBox from "../tasks/MessageBox";
import Preloader from "../tasks/Preloader";

const ListProductsOnCard = (products: ProductResource[]) => {

    if (!products.length) return ;

    return products.map((p: ProductResource, k) => {
        return (
            <Card key={k} id={'product' + p.id} className={"col-5 m-auto " + ( p.attributes.for_sale_status ? 'active' : 'inactive') }>
            <Card.Body className="card-body row">
                <ul className="list-group col-6">
                    <li className='list-group-item'>Nome:                          <div>{p.attributes.name}</div></li>
                    <li className='list-group-item'>Códido:                        <div>{p.attributes.code}</div></li>
                    <li className='list-group-item'>Descrição:                     <div>{p.attributes.description}</div></li>
                    <li className='list-group-item'>Tipo de Artigo:                <div>{p.relationships.productType.name}</div></li>
                    <li className='list-group-item'>Preço Original:                <div>{p.attributes.price}</div></li>
                    <li className='list-group-item'>Preço com imposto:             <div>{p.attributes.price_with_tax}</div></li>
                    <li className='list-group-item'>Quantidade em stock:           <div>{p.attributes.stock_quantity}</div></li>
                </ul>
                <ul className='list-group col-6'>
                    <li className='list-group-item'>Unidade:                       <div>{p.attributes.unity_quantity}</div></li>
                    <li className='list-group-item'>Tipo de imposto:               <div>{p.relationships.tax.symbol}</div></li>
                    <li className='list-group-item'>Valor do imposto:              <div>{p.attributes.tax_value}</div></li>
                    <li className='list-group-item'>Total adicionado:   <div>{p.attributes.tax_total_added}</div></li>
                    {/*<li className='list-group-item'>Armazem:  <div>${p.attributes.storage}</div></li>*/}
                    <li className='list-group-item'>Código de Isenção:             <div>{p.attributes.tax_exemption_code}</div></li>
                    <li className='list-group-item'>Motivo de Isenção:             <div>{p.attributes.tax_exemption_reason}</div></li>
                    <li className='list-group-item'>Estado do produto:             <div>{p.attributes.for_sale_status ? 'Activado': 'Desactivado'}</div></li>
                </ul>
            </Card.Body>
            <Card.Footer className="card-footer">
                <Form>
                    <Button onSubmit={(evt: FormEvent) => {
                        evt.preventDefault();
                        const btnValue: string = (evt.target as HTMLButtonElement).value;

                        (() => {
                            Preloader.active();
                            ProductsRequests.deleteProduct(+p.id).then(() => {
                                Preloader.inactive();

                                MessageBox.open( (
                                    p.attributes.for_sale_status ?
                                    'Produto desactivado' : 'Produto activado'
                                ) + ', reinicio em 5 segundos');

                                setInterval(() => {
                                    location.reload()
                                }, 5000);

                            }).catch(e => {
                                console.log(e);
                                MessageBox.open('Não foi possível mudar o estado do produto/serviço');
                                Preloader.inactive();
                            });
                        })();

                        const card = document.getElementById(btnValue) as HTMLElement;
                        if (card.classList.contains('active')) {
                            card.classList.remove('active');
                            card.classList.add((p.attributes.for_sale_status ? 'active' : 'inactive'));
                        }

                    }} type="submit" value={'product' + p.id} className="btn btn-success">
                        { !p.attributes.for_sale_status ? 'Tornar disponível' : 'Tornar Produto indisponível'}
                    </Button>

                </Form>
            </Card.Footer>
        </Card>);
    });

}


export default ListProductsOnCard;
