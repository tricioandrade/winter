import '../../css/Home.css';
import homeNormalUserTemplate from '../templates/homeNormalUserTemplate';
import homeAdminUserTemplate from '../templates/homeAdminUserTemplate';
import {buildTemplate} from "../traits/buildTemplate";
import {dispatch} from "../traits/Route";

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
        else root.innerHTML = homeAdminUserTemplate;
        this.setPrivilegeStatus();

        this.route();
    }

    private setPrivilegeStatus () {
       // return  this.privilege = status;
    }

    private get getPrivilegeStatus (): any {
        return Home.privilege;
    }

    private route () {

        const router = () => {
            this.shadowRoot?.addEventListener('click', ev => {
                ev.preventDefault();
                ev?.target?.removeEventListener('click', evt => {
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                });
                const elem: any = ev?.target as HTMLElement;
                console.log(elem);
                window.history.pushState({}, "", elem.href);
                dispatch(window.location.pathname);
                ev.stopImmediatePropagation();
            });
        };
        (window as any).route = router;
    }

}

customElements.define('home-page', Home);
