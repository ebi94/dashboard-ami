import React, { useEffect, useState, useRef } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Row,
    Form,
    Spinner,
    InputGroup
} from "react-bootstrap";
import { useFormik } from "formik";
import NotificationAlert from "react-notification-alert";
import { getPrice, editPrice } from "services/setting";

const Settings = () => {

    const notificationAlertRef = useRef(null)

    const [loading, setLoading] = useState(false);
    const [basePrice, setBasePrice] = useState(0);
    const [fee, setFee] = useState(0);
    const [additionalCosts, setAdditionalCosts] = useState(0);

    const notify = (message, type) => {
        const options = {
            place: "tc",
            message: (
                <div>
                    <b>{message}</b>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-check-2",
            autoDismiss: 3,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const checkPrice = async () => {
        const res = await getPrice();
        const data = res[0];
        setBasePrice(data && data.basePrice);
        setFee(data && data.fee);
        setAdditionalCosts(data && data.additionalCosts);
    };

    const handleSubmit = async (data) => {
        const res = await editPrice(data);
        if (res && res.status === 'OK') {
            notify(res.messages, "success");
            setLoading(false)
        } else {
            notify(res.messages, "danger");
            setLoading(false)
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            basePrice,
            fee,
            additionalCosts,
        },
        onSubmit: (values) => {
            handleSubmit(values);
            setLoading(true)
        }
    });

    useEffect(() => {
        checkPrice();
    }, [])
    return (
        <>
            <NotificationAlert ref={notificationAlertRef} />
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Setting Price</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <label>Base Price / Harga Dasar</label>
                                                <InputGroup>
                                                    <InputGroup.Text>SAR</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        onChange={(e) => setBasePrice(e.target.value)}
                                                        value={formik.values.basePrice}
                                                    ></Form.Control>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <label>Fee / Biaya</label>
                                                <InputGroup>
                                                    <InputGroup.Text>SAR</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        onChange={(e) => setFee(e.target.value)}
                                                        value={formik.values.fee}
                                                    ></Form.Control>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <label>Additional Costs / Biaya Lain-lain</label>
                                                <InputGroup>
                                                    <InputGroup.Text>SAR</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        onChange={(e) => setAdditionalCosts(e.target.value)}
                                                        value={formik.values.additionalCosts}
                                                    ></Form.Control>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ textAlign: 'end' }}>
                                            <Button
                                                className="btn-fill pull-right"
                                                style={{ minWidth: 150 }}
                                                disabled={loading}
                                                type="submit"
                                                variant="info"
                                            >
                                                {loading ? <Spinner animation="border" variant="secondary" style={{ fonstSize: 10, height: 20, width: 20 }} size="sm" /> : "Save / Simpan"}
                                            </Button></Col>
                                    </Row>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Settings;
