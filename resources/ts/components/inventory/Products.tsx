import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';




const Products = (props: any) => {


    console.log(props);

    return;
    return
        <Container className={ props.display }>
            <Row>
                <Col lg={10}>
                    <table>
                        <thead>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
}

export default Products;