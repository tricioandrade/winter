


class MessageBox  {
    private static modal: HTMLElement = document.querySelector('.modal')! as HTMLElement;

    public static open(message: string): void {
        this.modal.classList.add('modal-active');
        const p = this.modal.querySelector('p')!;
        console.log(p);
        p.textContent = message;

        const close = this.modal.querySelector('.btn-close') as HTMLElement;
        close.addEventListener('click', () => {
            this.modal.classList.remove('modal-active');
        });
    }
}
export default MessageBox;
