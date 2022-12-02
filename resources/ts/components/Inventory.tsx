import React from "react";
import {InventoryTemplate} from "../templates/InventoryTemplate";



export class Inventory extends React.Component {
    // private template: HTMLTemplateElement;


    constructor(props: object) {
        super(props);
    }

    componentDidMount() {

    }


    render () {
        return <InventoryTemplate />
    }
}
