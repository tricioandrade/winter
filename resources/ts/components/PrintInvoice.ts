class PrintInvoice extends HTMLElement{
    // private invoice: [] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const template = document.createElement('template');
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        console.log(template);
    }


    showInvoiceList() {

    }

    printAgain = () => {
        this.shadowRoot?.querySelector('#printAgain')?.addEventListener('click', ev => {
            ev.preventDefault();
            // new  InvoiceBuilder(this.invoice);
        });
    }
}

customElements.define('print-invoice', PrintInvoice);
