import React from "react";
import UsersRequests from "../../requests/UsersRequests";
import HomeAdminUserTemplate from "./HomeAdminUserTemplate";
import {User} from "../../interfaces/User";
import '../../../css/Home.css';

class Home extends React.Component{
    user: User[] = [];

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
        return HomeAdminUserTemplate;
    }
}

export default Home;
