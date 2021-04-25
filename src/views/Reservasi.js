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

const Reservasi = () => {
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
                                <Card.Title as="h4">Reservasi</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <Form.Group>
                                                <label>Start Date</label>
                                                <Form.Control
                                                    placeholder="Username"
                                                    type="date"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <Form.Group>
                                                <label>End Date</label>
                                                <Form.Control
                                                    placeholder="Username"
                                                    type="date"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Route
                                                </label>
                                                <Form.Control as="select" name="select" id="exampleSelect">
                                                    <option>Jeddah - Jeddah</option>
                                                    <option>Jeddah - Mecca</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        style={{ minWidth: 150 }}
                                        variant="info"
                                        onClick={() => getMuthowif()}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner animation="border" variant="secondary" style={{ fonstSize: 10, height: 20, width: 20 }} size="sm" /> : "Cari Muthowif"}
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {listMuthowif.map((data, index) => (
                            <>
                                <CardMuthowif
                                    name={data.firstName}
                                    data={data}
                                    onClickDetail={(data) => onClickDetail(data)}
                                    onClickBook={(data) => onClickBook(data)}
                                />
                            </>
                        ))
                        }
                    </Col>
                </Row>
                {/* Start Modal Details */}
                <Modal
                    className="modal-primary"
                    show={showModalDetail}
                    style={{ top: '-145px', height: '120%' }}
                    onHide={() => setShowModalDetail(false)}
                >
                    <Modal.Header className="justify-content-center">
                        <div className="modal-profile">
                            <i className="nc-icon nc-bulb-63"></i>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h3>Data Detail</h3>
                        <Row className="text-left" >
                            <Col md="6"><p className="text-muted"><span>Nama Lengkap</span></p></Col>
                            <Col md="6"><p>{dataDetail.firstName}</p></Col>
                        </Row>
                        <Row className="text-left">
                            <Col md="6"><p className="text-muted"><span>Alamat</span></p></Col>
                            <Col md="6"><p>{dataDetail.address}</p></Col>
                        </Row>
                        <Row className="text-left">
                            <Col md="6"><p className="text-muted"><span>Jumlah Perjalanan</span></p></Col>
                            <Col md="6"><p>0</p></Col>
                        </Row>
                        <Row className="text-left">
                            <Col md="6"><p className="text-muted"><span>Rating</span></p></Col>
                            <Col md="6"><p className="text-primary">5/5</p></Col>
                        </Row>
                        <Row className="text-left">
                            <Col md="6"><p className="text-muted"><span>Kontak</span></p></Col>
                            <Col md="6"><p>{dataDetail.phone}</p></Col>
                        </Row>
                    </Modal.Body>
                    <div className="modal-footer justify-content-end">
                        <Button
                            className="btn-fill pull-right"
                            type="button"
                            variant="warning"
                            onClick={() => setShowModalDetail(false)}
                        >
                            Keluar
                        </Button>
                    </div>
                </Modal>
                {/* End Modal Detail */}
                {/* Start Modal Booking */}
                <Modal
                    className="modal-primary modal-booking"
                    show={showModalBook}
                    style={{}}
                    onHide={() => setShowModalBook(false)}
                >
                    <Modal.Header className="justify-content-center">
                        <div className="modal-profile">
                            <i className="nc-icon nc-notes"></i>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="">
                        <h3 className="text-center">Form Reservasi</h3>
                        <Form>
                            <Row>
                                <Col className="pr-1">
                                    <Form.Group>
                                        <label>Start Date</label>
                                        <Form.Control
                                            disabled
                                            defaultValue=""
                                            type="date"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="pl-1">
                                    <Form.Group>
                                        <label>End Date</label>
                                        <Form.Control
                                            disabled
                                            defaultValue=""
                                            type="date"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="py-1" md="12">
                                    <Form.Group>
                                        <label>Nama Muthowif</label>
                                        <Form.Control
                                            disabled
                                            defaultValue={dataBook.firstName}
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>Detail Fligth</label>
                                        <Form.Control
                                            defaultValue=""
                                            placeholder=""
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <Form.Group>
                                        <label>Kode Penerbangan</label>
                                        <Form.Control
                                            defaultValue=""
                                            placeholder=""
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>Jam Keberangkatan</label>
                                        <Form.Control
                                            defaultValue=""
                                            placeholder=""
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <Form.Group>
                                        <label>Jam Kepulangan</label>
                                        <Form.Control
                                            defaultValue=""
                                            placeholder=""
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="py-1">
                                    <Form.Group>
                                        <label>PIC / Kontak Travel Agent</label>
                                        <Form.Control
                                            placeholder=""
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="py-1">
                                    <Form.Group>
                                        <label>Metode Pembayaran</label>
                                        <Form.Control
                                            placeholder=""
                                            type="number"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex align-items-center justify-content-between">
                                <Button
                                    className="btn-fill pull-right"
                                    variant="warning"
                                    onClick={() => setShowModalBook(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className="btn-fill pull-right"
                                    type="submit"
                                    variant="info"
                                >
                                    Pesan Sekarang
                                </Button>
                            </div>
                            <div className="clearfix"></div>
                        </Form>
                    </Modal.Body>
                    <div className="modal-footer">
                    </div>
                </Modal>
                {/* End Modal Booking */}
            </Container>
        </>
    );
}

export default Reservasi;
