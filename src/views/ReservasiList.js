import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Spinner,
    Col,
    Modal
} from "react-bootstrap";
import CardMuthowif from "components/CardMuthowif/CardMuthowif";

const ReservasiList = () => {
    const [listMuthowif, setListMuthowif] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const [dataBook, setDataBook] = useState({});
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalBook, setShowModalBook] = useState(false);
    const getMuthowif = () => {
        setLoading(true)
        axios.get('https://backend-ami.herokuapp.com/muthowif')
            .then((response) => {
                const data = response && response.data && response.data.data;
                setListMuthowif(data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log('error', error);
                setLoading(false);
            });
    };

    const onClickDetail = (data) => {
        setDataDetail(data);
        setShowModalDetail(true);
    };

    const onClickBook = (data) => {
        setDataBook(data);
        setShowModalBook(true);
    };

    useEffect(() => {
        console.log("list Muthowif", listMuthowif);
    }, [listMuthowif])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Reservasi List</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ReservasiList;
