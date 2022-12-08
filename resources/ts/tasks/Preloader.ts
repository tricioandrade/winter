class Preloader{
    private static preloader: HTMLElement = document.querySelector('.preloader')! as HTMLElement;

    static active() {
        this.preloader.classList.add('active');
    }

    static inactive(){
        this.preloader.classList.remove('active');
    }
}

export default Preloader;
