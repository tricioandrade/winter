export const buildTemplate = < T extends keyof HTMLElementTagNameMap | string>(tagName: T, content: string): HTMLTemplateElement => {
    const element = document.createElement(tagName)! as HTMLTemplateElement;
    element.innerHTML = content;
    return element;
}
