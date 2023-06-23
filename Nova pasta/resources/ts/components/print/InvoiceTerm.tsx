import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import logo from '../../../images/outonologo.png';


const InvoiceTerm = ({ data }) => {

    const header = () => {

    }


    const productsTable = () => {

    }

    const footer = () => {

    }


    return (
        <Container className='printable term p-0'>
            <Row className="p-0">
                {/*Company Details*/}
                <Col>
                    {/*Company Name*/}
                    <span> { data?.realionships.company.name }</span>

                    {/*Company Address*/}
                    <span>{}</span>

                    {/*Company Nif*/}
                    <span>NIF: {}</span>
                </Col>

                {/*Document Info*/}
                <Col>
                    {  }
                </Col>
                <Col lg={12}>
                    <table className="header">
                        th
                    </table>
                </Col>
            </Row>
        </Container>
    )
}
