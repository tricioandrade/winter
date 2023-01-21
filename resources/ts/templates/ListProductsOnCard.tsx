import React, {FormEvent} from "react";
import {Button, Col, Card, Form} from "react-bootstrap";
import {ProductResource} from "../interfaces/ProductResource";
import ProductsRequests from "../requests/ProductsRequests";
import MessageBox from "../tasks/MessageBox";
import Preloader from "../tasks/Preloader";

const ListProductsOnCard = (products: ProductResource[]) => {

    if (!products.length) return ;


    return products.map((p: ProductResource, k) => {
        return (
            <Card key={k}  className={"col-11 m-1 m-auto" + ( p.attributes.for_sale_status ? 'active' : 'inactive') }>
                <Card.Body>
                    <table lg={12} className='table'>
                        <tr><th className='col-6' >Nome:                   </th><td className='col'>{p.attributes.name}</td></tr>
                        <tr><th className='col-6' >Códido:                 </th><td className='col'>{p.attributes.code}</td></tr>
                        <tr><th className='col-6' >Descrição:              </th><td className='col'>{p.attributes.description}</td></tr>
                        <tr><th className='col-6' >Tipo de Artigo:         </th><td className='col'>{p.relationships.productType.name}</td></tr>
                        <tr><th className='col-6' >Preço base:             </th><td className='col'>{p.attributes.price}</td></tr>
                        <tr><th className='col-6' >Preço com imposto:      </th><td className='col'>{p.attributes.price_with_tax}</td></tr>
                        <tr><th className='col-6' >Quantidade em stock:    </th><td className='col'>{p.attributes.stock_quantity}</td></tr>
                        <tr><th className='col-6' >Unidade:                </th><td className='col'>{p.attributes.unity_quantity}</td></tr>
                        <tr><th className='col-6' >Valor do imposto:       </th><td className='col'>{p.relationships.tax.symbol}</td></tr>
                        <tr><th className='col-6' >Valor do imposto:       </th><td className='col'>{p.attributes.tax_value}</td></tr>
                        <tr><th className='col-6' >Total de taxa adicionada</th><td className='col'>{p.attributes.tax_total_added}</td></tr>    
                        <tr><th className='col-6' >Código de Isenção:      </th><td className='col'>{p.attributes.tax_exemption_code}</td></tr>
                        <tr><th className='col-6' >Motivo de Isenção:      </th><td className='col'>{p.attributes.tax_exemption_reason}</td></tr>
                        <tr><th className='col-6' >Estado do produto:      </th><td className='col'>{p.attributes.for_sale_status ? 'Activado': 'Desactivado'}</td></tr>
                    </table>
                </Card.Body>
                <Card.Footer>
                    <Col lg={12}>
                        <Form onSubmit={(evt: FormEvent) => {
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

                            }}>
                            <Button type="submit" value={'product' + p.id} className="btn btn-success">
                                { !p.attributes.for_sale_status ? 'Tornar disponível' : 'Tornar Produto indisponível'}
                            </Button>
                        </Form>
                    </Col>
                </Card.Footer>
            </Card>);
    });
}

export default ListProductsOnCard;
