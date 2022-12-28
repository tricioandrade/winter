



class InvoiceList extends HTMLFormElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const template = document.createElement('template');
        template.innerHTML = `
            <form>
                <input type="text">
                <button type="submit">tOP</button>
            </form>
        `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        console.log(template);
        console.log(InvoiceList);

    }




}

customElements.define('invoice-list', InvoiceList);
