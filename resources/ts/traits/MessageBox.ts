import {MessageBoxTemplate} from "../templates/MessageBoxTemplate";


const MessageBox =  (message: string) => {
    let modal = document.querySelector('.modal') as HTMLElement;
    modal?.remove();
    const app = document.querySelector('main')! as HTMLElement;
    app.innerHTML += MessageBoxTemplate(message);
    modal = document.querySelector('.modal')! as HTMLElement;
    const p = modal.querySelector('p')!;
    console.log(message);
    console.log(p);
    p.textContent = message;

    const close = document.querySelector('.modal .btn-close') as HTMLElement;
    close.addEventListener('click', () => {
        console.log(modal);
        modal.remove();
    });
}
export default MessageBox;
