import messageBoxTemplate from "../templates/messageBoxTemplate";

class MessageBox extends HTMLElement{

    constructor() {
        super();
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = messageBoxTemplate;
        this.attachShadow({ mode: "open" });
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        // this.attributeChangeCallback('opened', '', '');
    }

    attributeChangeCallback(name: string, _: any, __: any){
        const modal = this.shadowRoot?.querySelector('.modal');
        console.log(modal);
        if (name === 'opened'){
            if (this.hasAttribute('opened'))
                    modal?.classList.add('active');
            else modal?.classList.remove('active');
        }
    }

    static get observedAttributes(){
        return ['opened'];
    }

    static closeModal(M: any = MessageBox) {
        M.shadowRoot?.querySelector('.modal')?.removeAttribute('opened');
    }

    static openModal (message: string, M: any = MessageBox) {
        const slot  = M.shadowRoot?.querySelector('p')!;
        slot.textContent = message;
        M.shadowRoot?.querySelector('.modal')?.setAttribute('opened', 'true');
    }
}

customElements.define('message-box', MessageBox);
export default MessageBox;
