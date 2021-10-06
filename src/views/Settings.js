import React from "react";
import {
    Card,
    Col,
    Container,
    Row,
} from "react-bootstrap";

const Settings = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Setting Price</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <span>Base Price</span>
                                        <h4 className="h4-custom">-</h4>

                                    </Col>
                                    <Col>
                                        <span>Fee</span>
                                        <h4 className="h4-custom">-</h4>

                                    </Col>
                                    <Col>
                                        <span>Another</span>
                                        <h4 className="h4-custom">-</h4>

                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Settings;
