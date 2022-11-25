import '../../css/Home.css';
import homeNormalUserTemplate from '../templates/homeNormalUserTemplate';
import homeAdminUserTemplate from '../templates/homeAdminUserTemplate';
import {buildTemplate} from "../traits/buildTemplate";

type combinable = string | number | [] | boolean;

class Home extends HTMLElement{
    private static privilege: combinable;
    // private static attachTemplateCall: Function;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const template = buildTemplate('template', homeNormalUserTemplate);
        this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const root = this.shadowRoot?.querySelector('#home-component')! as HTMLElement;
        if (this.getPrivilegeStatus) root.innerHTML = homeAdminUserTemplate;
        else root.innerHTML = homeNormalUserTemplate;
        this.setPrivilegeStatus();
    }

    private setPrivilegeStatus () {
       // return  this.privilege = status;
    }

    private get getPrivilegeStatus (): any {
        return Home.privilege;
    }

}

customElements.define('home-page', Home);
