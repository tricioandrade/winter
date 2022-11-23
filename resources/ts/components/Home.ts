import './Home.css';
import {buildTemplate} from "../tasks/buildTemplate";
import homeNormalUserTemplate from '../templates/homeNormalUserTemplate';
import homeAdminUserTemplate from '../templates/homeAdminUserTemplate';
import {renderTemplate} from "../tasks/renderTemplate";

type combinable = string | number | [] | boolean;

class Home extends HTMLElement{
    private static privilege: combinable;
    private template: HTMLTemplateElement;

    private static attachTemplateCall: Function;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        Home.attachTemplateCall = this.attachTemplate;
    }

    private attachTemplate () {
        if (Home.privilege) this.template = buildTemplate('div', homeAdminUserTemplate);
        else this.template = buildTemplate('div', homeNormalUserTemplate);
        this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
        console.log(this.template);
    }

    public static set setPrivilegeStatus (status: any) {
        this.privilege = status;
    }

    private get getPrivilegeStatus (): combinable {
        return Home.privilege;
    }

    static render () {
        this.attachTemplateCall();
        renderTemplate(document.createElement('home-page'));
    }
}

customElements.define('home-page', Home);
export default Home;
