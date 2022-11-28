u
import '../../css/Home.css';
import homeNormalUserTemplate from '../templates/homeNormalUserTemplate';
import homeAdminUserTemplate from '../templates/homeAdminUserTemplate';
import {buildTemplate} from "../traits/buildTemplate";
import {dispatch} from "../traits/Route";

type combinable = string | number | [] | boolean;

class Home extends HTMLElement{
    private static privilege: combinable;
    private template;
    constructor() {
        super();
        // this.({mode: 'open'});
        this.template = buildTemplate('template', homeNormalUserTemplate);
        this.appendChild(this.template.content.cloneNode(true));

    }

    connectedCallback() {
        const root = this.querySelector('#home-component')! as HTMLElement;
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
        (window as any).route = () => {
            this.addEventListener('click', ev => {
                ev.preventDefault();
                ev.stopImmediatePropagation();

                const elem: any = ev?.target as HTMLElement;
                window.history.pushState({}, "", elem.href);
                dispatch(window.location.pathname);
            });
        };
    }

}

customElements.define('home-page', Home);
