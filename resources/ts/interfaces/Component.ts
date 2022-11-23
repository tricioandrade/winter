
export interface Component {

    attachTemplate (): void;
    setPrivilegeStatus (status: any);
    getPrivilegeStatus (): any;
    render (): void;
}
