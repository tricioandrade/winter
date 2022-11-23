export const renderTemplate = < T extends HTMLElement>(template: T, mainRoot: string = '#root'): void => {
    const root = document.getElementById(mainRoot)! as HTMLElement;
    root.innerHTML = '';
    root.appendChild(template);
}
