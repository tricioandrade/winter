import React from "react";
import {User} from "../interfaces/User";
import UsersRequests from "../requests/UsersRequests";

import '../../css/Home.css';
import homeAdminUserTemplate from '../templates/HomeAdminUserTemplate';

class Home extends React.Component{
    user: User[] = []

    constructor(props: object) {
     super(props);
    }

    componentDidMount() {
        this.setUser();
    }

    private setUser () {
        UsersRequests.getSingleUser(1).then(data => {
            this.user = data.data;
            console.log(this.user);
        }).catch( e => { console.log(e) });
    }

    render () {
        return homeAdminUserTemplate;
    }
}

export default Home;
