import { UserPrivilege } from "../enums/UserPrivilege";

export interface UserResource {
    id: string | number;
    attributes: {
        name: string;
        email: string;
        privilege: UserPrivilege;
    }
}