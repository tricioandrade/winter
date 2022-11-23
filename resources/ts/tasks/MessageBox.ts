import messageBoxTemplate from "../templates/messageBoxTemplate";

class MessageBox extends HTMLElement{
    constructor() {
        super();
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = messageBoxTemplate;
        this.attachShadow({ mode: "open" });
        this.shadowRoot?.appendChild(template.content.cloneNode(true));

    }

    

}
customElements.define('message-box', MessageBox);
export default MessageBox;
