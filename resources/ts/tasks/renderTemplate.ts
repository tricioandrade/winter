export const renderTemplate = < T extends keyof HTMLElementTagNameMap & string >(template: T, mainRoot: string = 'root') => {
    const root = document.getElementById(mainRoot)! as HTMLElement;
    root.innerHTML = '';
    root.appendChild(document.createElement(template));
}
