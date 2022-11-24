import '../../css/Home.css';
import homeNormalUserTemplate from '../templates/homeNormalUserTemplate';
import homeAdminUserTemplate from '../templates/homeAdminUserTemplate';
import {renderTemplate} from "../tasks/renderTemplate";
import {buildTemplate} from "../tasks/buildTemplate";

type combinable = string | number | [] | boolean;

class Home extends HTMLElement{
    private static privilege: combinable;
    private static attachTemplateCall: Function;

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
    }

    public static set setPrivilegeStatus (status: any) {
        this.privilege = status;
    }

    private get getPrivilegeStatus (): combinable {
        return Home.privilege;
    }

    static render () {
        this.attachTemplateCall();
        renderTemplate('home-page');
    }
}

customElements.define('home-page', Home);
export default Home;
