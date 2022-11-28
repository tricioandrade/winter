export const renderTemplate = < T extends keyof HTMLElementTagNameMap | string >(template: T, mainRoot: string = 'root'): boolean => {
    const root = document.getElementById(mainRoot)! as HTMLElement;
    root.innerHTML = '';

    console.log(template);
    try { root.appendChild(document.createElement(template));
        return true; }
    catch (e) { return false }
}
