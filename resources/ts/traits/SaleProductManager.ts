import axios from "../api/axios";
import MessageBox from "../components/MessageBox";
// import {Product} from "../interfaces/Product";
import ShoppingCartManager from "./ShoppingCartManager";
import CalculatorTrait from "./CalculatorTrait";


class SaleProductManager extends ShoppingCartManager{



     saleFormProduct =  () => {

        // InvoiceList().then( temp => document.getElementById('changed_ref').innerHTML = temp.template);


        const form =  document.getElementById('sale-form-product');
        const calculator = new CalculatorTrait();
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const productInput = form.productInput.value;
            const quantity = form.quantity.value;
            const discount = 0;

            try {
                let One = 1;
                if (calculator.actualProduct){
                    One = calculator.actualProduct.quantity
                }

                console.log(`calculator/${productInput +'/'+ quantity +'/'+ discount}`);
                const  response = await axios.get(`calculator/${productInput +'/'+ quantity+ '/'+ One +'/'+ discount}` );
                let product  = response.data.data.data.product;

                calculator.addProduct(product);
            }
            catch (e){
                console.log(e);
                MessageBox('Não foi possivel adicionar o produto, por favor verifique o stock do produto!');
            }
        });

        calculator.remProduct();

        this.finishSale(calculator);
    }
}

export default SaleProductManager;
