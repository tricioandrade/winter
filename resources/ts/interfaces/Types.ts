export default interface Types {
    createElement:  { <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K]; }
}