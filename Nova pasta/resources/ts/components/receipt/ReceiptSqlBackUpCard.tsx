import React from "react";
import { Button, Card } from "react-bootstrap";


const ReceiptSqlBackUpCard = () =>{

    return (
        <Card className="shadow rounded">
            <Card.Body >
                <h5 className="card-title">Banco de Dados </h5>
            </Card.Body>
            <Card.Footer className="text-end">
                <Button className='float-end'>Exportar</Button>
            </Card.Footer>
        </Card>
    );
}

export default  ReceiptSqlBackUpCard;
