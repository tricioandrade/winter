import messageBoxTemplate from "../templates/messageBoxTemplate";

class MessageBox extends HTMLElement{

    constructor() {
        super();
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = messageBoxTemplate;
        this.attachShadow({ mode: "open" });
        this.shadowRoot?.appendChild(template.content.cloneNode(true));

    }

    attributeChangeCallback(name: string, _: any, __: any){
        if (name === 'opened'){
            if (this.hasAttribute('opened')){
                this.shadowRoot?.querySelector('.modal')
                    ?.classList.add('active');
            }
            else {
                this.shadowRoot?.querySelector('.modal')
                    ?.classList.remove('active');
            }
        }
    }

    static get observedAttributes(){
        return ['opened'];
    }

    static closeModal(M: any = MessageBox) {
        M.shadowRoot?.querySelector('.modal')?.removeAttribute('opened');
    }

    static openModal (message: string, M: any = MessageBox) {
        const slot  = M.shadowRoot?.querySelector('slot')!;
        slot.textContent = message;
        M.shadowRoot?.querySelector('.modal')?.setAttribute('opened', '');
    }
}

customElements.define('message-box', MessageBox);
export default MessageBox;
