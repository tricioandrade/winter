import SaleProdutTableRows from "./SaleProdutTableRows";
import currency from 'currency.js';
import MessageBox from "./MessageBox";

class SaleProductCalculator {
    constructor () {
        this.soldProducts = [];
        this.total = 0;
        this.totalServices = 0.00;
        this.totalIva = 0;
        this.actualProduct = null;
        this.i = 0;
        this.invoice_changed_ref = '';
        this.type_of_change = '';
    }

    paidValue = () => document.getElementById("paidValue").value;
    addProduct = (product) => {
        this.actualProduct = { ...product}

        const index = this.soldProducts.findIndex(object => {
            return object.product_id === this.actualProduct.product_id;
        });

        const i =  this.soldProducts.length + 1;

        console.log(this.soldProducts);
        if (index >= 0){
            this.totalIva = parseFloat(this.totalIva) + parseFloat(this.actualProduct.total_added_tax);

            this.soldProducts[index].total = (parseFloat(this.actualProduct.total) + parseFloat(this.soldProducts[index].total)).toFixed(4);
            this.soldProducts[index].quantity = (parseInt(this.actualProduct.quantity) + parseInt(this.soldProducts[index].quantity));
            this.soldProducts[index].total_added_tax = parseFloat(this.soldProducts[index].tax_total_added).toFixed(4);
            this.remProduct( this.soldProducts[index].product_id);

            SaleProdutTableRows(this.soldProducts[index]);

            console.log(this.soldProducts);
            this.total = currency(parseFloat(this.total)).add(this.actualProduct.total);

            if (this.actualProduct.type === 'S')
                this.totalServices =  currency(parseFloat(this.totalServices).toFixed(4)).add(this.actualProduct.total);


        }else{
            this.soldProducts[this.i] = this.actualProduct;
            this.total = currency(parseFloat(this.total)).add(this.soldProducts[this.i].total);
            if (this.actualProduct.type === 'S')
                this.totalServices =  currency(parseFloat(this.totalServices)).add(this.soldProducts[this.i].total);

            this.totalIva = parseFloat(this.totalIva) + parseFloat(this.actualProduct.total_added_tax);
            SaleProdutTableRows(this.soldProducts[this.i]);
            this.i ++;
        }

        console.log(this.totalIva);

        this.fillSoldProducts();
        document.getElementById(`totalValue`).value = this.total;
    }

    remProduct = (index = null) => {
        const tableBodySell = document.querySelector("#saleTable ");

        tableBodySell.addEventListener('click', ev => {
            const elem = ev.target?.tagName === 'A' || ev.target?.tagName === 'a' ? (ev.target?.parentElement).parentElement.getAttribute('id') :
                ( ev.target?.tagName === 'SVG' || ev.target?.tagName === 'svg' ? ((ev.target?.parentElement).parentElement).parentElement.getAttribute('id') :
                        ( ev.target?.tagName === 'PATH' || ev.target?.tagName === 'path' ? (((ev.target?.parentElement).parentElement).parentElement).parentElement.getAttribute('id') : '' )
                );

            const index = this.soldProducts.findIndex(object => {
                return object?.product_id === parseInt(elem);
            });

            this.total = parseFloat(this.total) - parseFloat(this.soldProducts[index].total);
            if ( parseFloat(this.totalIva) >= parseFloat(this.soldProducts[index].total)){
                this.totalIva = parseFloat(this.totalIva) - parseFloat(this.soldProducts[index].total);
            }
            if (!isNaN(parseInt(elem)) && this.soldProducts.splice(this.soldProducts.indexOf(elem), 1)){
                document.getElementById(`${elem}`).remove();
                document.getElementById(`totalValue`).value = this.total.toLocaleString('ao-AO');
            }
        });

        if (index){
            const remove = document.getElementById(`removeProduct${index}`);
            (remove.parentElement).parentElement.remove();
        }
    }


    closeSale = (invoiceType = null) => {
        let paymentMechanism = document.getElementById("payment_mechanism").value;
        let paidValue = document.getElementById("paidValue").value;

        if (invoiceType === 'VD'){
            paymentMechanism = 'NU';
        }

        if ((paymentMechanism === 'NU') && !isNaN(parseFloat(paidValue)) && (parseFloat(paidValue) >= parseFloat(this.total)) ){
            document.getElementById("change").value = parseFloat(paidValue) - parseFloat(this.total);

            return {
                change: parseFloat(paidValue) - parseFloat(this.total),
                paidValue: parseFloat(paidValue),
                paymentCondition: paymentMechanism,
                invoice_changed_ref: document.getElementById('invoice_changed_ref').value,
                type_of_change: document.getElementById('type_of_change').value
            };
        }

        else if (isNaN(parseFloat(paidValue)) && (paymentMechanism === 'NU') || (parseFloat(paidValue) < parseFloat(this.total)) ) {
            MessageBox("O valor de pagamento não pode ser inferior à cotação gerada!");
            return {
                stop: true
            }
        }

        else return {
            change: 0,
            paidValue: this.total,
            paymentCondition: paymentMechanism,
            invoice_changed_ref: document.getElementById('invoice_changed_ref').value,
            type_of_change: document.getElementById('type_of_change').value
            };
    }

    fillSoldProducts = () => {
        this.soldProducts = this.soldProducts.filter( element => {
            return element !== null
        });
    }

    hasProduct = () => {

        if (this.soldProducts.length > 0)
            return true;
        else {
            MessageBox("Adicione pelo menos 1 produto para venda!");
        }

        return false;
    }

    render () {
        return {
            actualProduct: this.actualProduct,
            products: this.soldProducts,
            total: this.total.value,
            totalServices: this.totalServices.value ?? this.totalServices,
            totalIva: this.totalIva,
            paymentMethod: 'Pronto pagamento'
        }
    }
}

export default SaleProductCalculator;
