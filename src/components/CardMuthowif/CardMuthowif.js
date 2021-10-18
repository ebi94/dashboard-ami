import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    Col,
    Row
} from "react-bootstrap";

const CardMuthowif = props => {
    const { data, name, price, onClickDetail, onClickBook } = props;

    return (
        <Card>
            <Card.Header>
                <Card.Title>{name}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md="3">
                        <div style={{ padding: 15 }}>
                            <img
                                className="avatar border-gray"
                                style={{
                                    height: 150,
                                    width: 150,
                                    margin: "0 auto"
                                }}
                                alt="..."
                                src={
                                    require("assets/img/default-avatar.png")
                                        .default
                                }
                            ></img>
                        </div>
                    </Col>
                    <Col md="9">
                        <div className="typography-line" style={{ marginBottom: 0 }}>
                            <span>Rating</span>
                            <p className="text-primary mb-0">5/5</p>
                        </div>
                        <div className="typography-line" style={{ marginBottom: 0 }}>
                            <span>Perjalanan</span>
                            <p className="text-muted">0</p>
                        </div>
                        <div className="typography-line" style={{ marginBottom: 0 }}>
                            <span>Price</span>
                            <p className="text-muted">SAR {price}/day</p>
                        </div>
                        <div className="text-right">
                            <Button
                                className="btn-fill pull-left"
                                style={{ minWidth: 150 }}
                                onClick={() => onClickBook(data)}
                                variant="info"
                            >
                                Book
                            </Button>
                            <Button
                                className="btn-fill pull-left"
                                style={{ minWidth: 150, marginLeft: 10 }}
                                onClick={() => onClickDetail(data)}
                                variant="success"
                            >
                                Details
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

CardMuthowif.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onClickDetail: PropTypes.func.isRequired,
    onClickBook: PropTypes.func.isRequired
};



export default CardMuthowif;
