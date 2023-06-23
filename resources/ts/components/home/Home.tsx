import React from "react";
import UsersRequests from "../../requests/UsersRequests";
import {User} from "../../interfaces/UserResource";
import '../../../css/Home.css';
import HomeTemplate from "./HomeTemplate";

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
        return HomeTemplate;
    }
}

export default Home;
