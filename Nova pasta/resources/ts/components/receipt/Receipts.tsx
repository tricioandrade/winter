import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import axios from "../../api/axios";
import Preloader from "../../tasks/Preloader";
import MessageBox from "../../tasks/MessageBox";
import ReceiptSaftCard from "./ReceiptSaftCard";
import ReceiptSaleResume from "./ReceiptSaleResume";
import ReceiptSoldProductResume from "./ReceiptSoldProductResume";
import ReceiptSqlBackUpCard from "./ReceiptSqlBackUpCard";

const Receipts  = () => {
    const [invoices, setInvoices] = useState<object[]>();
    const [soldProducts, setSoldProducts] = useState<object[]>();
    const [receipt, setReceipt] = useState<boolean>(true);
    
    
    const requestData = async (callback: (invoices: object[], soldProducts: object[]) => void ) => {        
        Preloader.active();    
        try {
            const { data }: any = await axios.get('sales/invoices');
            let soldProducts: object[] = [];
            data.data.map((data: object) => {
                soldProducts.push(data?.relationships.products);
            });

            console.log(soldProducts);
            callback([ ...(data.data) ], soldProducts);
            Preloader.inactive();
        } catch (error) {
            console.log(error);
            MessageBox.open('Não foi possível carregar facturas');
            Preloader.inactive();
        }
    };

    useEffect( () => {
        if(receipt) {
            requestData((invoices: object[], soldProducts:object[]) => {
                setInvoices(invoices);   
                setSoldProducts(soldProducts);
            });

            setReceipt(false);
        };

    }, [receipt, invoices]);

    return (
        <Container id="sale-component" className="animation">
            <div className="row col-12 mb-5">
                <div className="page-title">
                    <div className="col-12 m-auto title-section">
                        <Link to="#" className="border-0 text-decoration-none" aria-current="page">
                            <i className="fa fa-cash-register"/>&nbsp;Relatórios</Link>
                    </div>
                </div>
            </div>
            <Row className="col-12 d-flex align-items-stretch" style={{ height: '75vh', overflow: 'auto' }}>
                <Row className='col-lg-8 col-md-8 m-1'>
                    <Col lg={12}>
                        <ReceiptSoldProductResume products = { soldProducts } invoices = { invoices }/>
                    </Col>
                    <Col lg={12} className='mt-4 mb-4'>
                        <ReceiptSaleResume invoices={ invoices } />
                    </Col>
                </Row>
                <Row className='col-lg-3 col-md-3 p-1' >
                    <Col className='mb-4'>
                        <ReceiptSqlBackUpCard />
                    </Col>
                    <Col className='mt-4 mb-4'>
                        <ReceiptSaftCard />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}


export default Receipts;