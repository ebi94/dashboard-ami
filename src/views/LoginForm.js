import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { Button, Col, Card, Form, Row, InputGroup, Spinner } from "react-bootstrap";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import NotificationAlert from "react-notification-alert";
import { login } from "services/auth";

const LoginForm = () => {

    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(true);

    const notificationAlertRef = useRef(null);

    const notify = (message, type) => {
        const options = {
            place: "tc",
            message: (
                <div>
                    <b>{message}</b>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-simple-remove",
            autoDismiss: 3,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const togglePass = () => {
        setShowPass(!showPass)
    };

    const handleLogin = async (values) => {
        const response = await login(values);
        console.log(response)
        if (response && response.status === 200) {
            const messages = response && response.data && response.data.messages;
            const dataUser = response && response.data && response.data.data;
            const token = response && response.data && response.data.accessToken;
            localStorage.setItem('token', token);
            localStorage.setItem('id', dataUser && dataUser.id)
            swal("Login Berhasil", messages, "success").then(() => {
                localStorage.setItem('dataUser', JSON.stringify(dataUser));
                window.location.replace('/dashboard');
            });
        } else {
            notify('Error !', 'warning');
            setLoading(false);
        };

    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            handleLogin(values);
            setLoading(true);
        },
    });

    return (
        <Row>
            <NotificationAlert ref={notificationAlertRef} />
            <Col md="4" style={{ margin: '0 auto' }}>
                <Card style={{ borderRadius: 10, boxShadow: '0 6px 15px rgb(0 0 0 / 16%)', marginTop: 100, border: 0 }}>
                    <Card.Header>
                        <Card.Title as="h4">Login to AMI Dashboard</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col className="pl-20 pr-20">
                                    <Form.Group>
                                        <label htmlFor="exampleInputEmail1">
                                            Email address
                                        </label>
                                        <Form.Control
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            placeholder="Masukan Email Anda"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            disabled={loading}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-20 pl-20">
                                    <Form.Group>
                                        <label>Password</label>
                                        <InputGroup>
                                            <Form.Control
                                                placeholder="Password"
                                                type={showPass ? "password" : "text"}
                                                name="password"
                                                placeholder="Masukan Password Anda"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onKeyUp={formik.handleBlur}
                                                disabled={loading}
                                            ></Form.Control>
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick={togglePass} id="btnShowPass" style={{ height: 40 }}>
                                                    {showPass ? <Eye /> : <EyeSlash />}
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-20 pl-20 text-right">
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                        style={{ minWidth: 100 }}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                                    </Button>
                                </Col>
                            </Row>
                            <div className="clearfix"></div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginForm