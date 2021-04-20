import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    Col, 
    Row
} from "react-bootstrap";

const CardMuthowif = props => {
    const { name } = props;
    return (
        <Card style={{height: "180px"}}>
        <Row>
            <Col md="2">
                <div style={{padding: 15}}>
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
            <Col md="10">
                <Card>
                    <Card.Header>
                        <Card.Title>{name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="typography-line" style={{marginBottom: 0}}>
                            <span>Rating</span>
                            <p className="text-primary mb-0">5/5</p>
                        </div>
                        <div className="typography-line" style={{marginBottom: 0}}>
                            <span>Price</span>
                            <p className="text-mute">Rp 500.000/day</p>
                        </div>
                        <div className="text-right">
                            <Button
                                className="btn-fill pull-left"
                                style={{minWidth: 150}}
                                // type="submit"
                                variant="info"
                            >
                                Book
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Card>
    );
}

CardMuthowif.propTypes = {
    name: PropTypes.string.isRequired
}



export default CardMuthowif;
