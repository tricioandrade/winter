export const render =  (tagName: keyof HTMLElementTagNameMap, content: string): void => {
    const root = document.getElementById('#root')! as HTMLElement;
    const element = document.createElement(tagName)! as HTMLElement;
    root.innerHTML = (element.innerHTML = content);
}