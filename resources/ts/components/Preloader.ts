const template = document.createElement('template');
template.innerHTML += `
<style>
.preloader.active {
    display: block;
}

.preloader {
    position: fixed;
    width: 1em;
    height: 5em;
    left: 50%;
    bottom: 35%;
    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;
    z-index: 999;
    display: none;
    background: #333;
    border-radius: 100px;
    border-top: 13px solid #f1d70f;
    border-bottom: 13px solid #f2d716;
    transition: all 300ms ease-in;
    animation: girar .4s ease-out infinite;
}

</style>
<span class="preloader"></span>
`;

class Preloader extends HTMLElement{
    static state: HTMLElement= document.querySelector('.preloader')! as HTMLElement;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }

    static active() {
        this.state.classList.add('active');
    }

    static inactive(){
        this.state.classList.remove('active');
    }
}

export default Preloader;
customElements.define('pre-loader', Preloader);
