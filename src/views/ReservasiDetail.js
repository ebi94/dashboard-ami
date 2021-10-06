import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Button,
    Form
} from 'react-bootstrap';
import swal from 'sweetalert';
import { Document, Page } from 'react-pdf';
import { getReservationDetail, uploadPayment, updateReservation } from 'services/reservation';
import { getDetailMuthowif } from 'services/muthowif';
import { getDetailTravel } from 'services/travel';

const ReservasiDetail = () => {
    const { id } = useParams();

    const data = JSON.parse(localStorage.getItem('dataUser'));

    const baseUrl = process.env.REACT_APP_BACKEND_API;

    const [dataDetail, setDataDetail] = useState({});
    const [dataMuthowif, setDataMuthowif] = useState({});
    const [dataTravel, setDataTravel] = useState({});

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };


    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    const previousPage = () => {
        changePage(-1);
    }

    const nextPage = () => {
        changePage(1);
    }

    const handleChangeUpload = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const getDataMuthowif = async (id) => {
        const res = await getDetailMuthowif(id);
        const data = res && res.data;
        setDataMuthowif(data);
    };

    const getDataTravel = async (id) => {
        const res = await getDetailTravel(id);
        const data = res && res.data;
        setDataTravel(data);
    }

    const getDataDetail = async (id) => {
        const res = await getReservationDetail(id);
        const data = res && res.data && res.data.data;
        const muthowifId = data && data.muthowifId;
        const travelId = data && data.travelId;
        if (muthowifId) {
            getDataMuthowif(muthowifId);
        };
        if (travelId) {
            getDataTravel(travelId)
        };
        setDataDetail(data);
    };

    const statusBadge = (id) => {
        switch (id) {
            case 1:
                return (
                    <Badge variant="info">Booked</Badge>
                );
            case 2:
                return (
                    <Badge variant="primary">Paid</Badge>
                );
            case 3:
                return (
                    <Badge variant="success">Confirmed</Badge>
                );
            case 4:
                return (
                    <Badge variant="warning">Canceled</Badge>
                );
            case 5:
                return (
                    <Badge variant="info">On the way</Badge>
                );
            case 6:
                return (
                    <Badge variant="success">Finish</Badge>
                );
            default:
                break;
        }
    };

    const handleUploadPayment = async () => {
        setLoading(true);
        const res = await uploadPayment(id, image);
        if (res && res.status === 200) {
            const messages = res && res.data && res.data.messages;
            swal("Sukses", messages, "success").then(() => {
                setLoading(false);
            });
        } else {
            swal("Error", 'Error', "error").then(() => {
                setLoading(false);
            });
        }
    };

    const handleUpdatePayment = async () => {
        setLoading(true);
        const values = {
            status: 2
        };

        const res = await updateReservation(id, values);

        if (res && res.status === 200) {
            const messages = res && res.data && res.data.messages;
            swal("Sukses", 'Pembayaran Sudah diterima', "success").then(() => {
                setLoading(false);
            });
        } else {
            swal("Error", 'Error', "error").then(() => {
                setLoading(false);
            });
        }
    };

    const downloadItenary = () => {
        const urlDownload = `${process.env.REACT_APP_BACKEND_API}/files/itenary/${dataDetail.pdfItenaryUrl}`
        window.open(urlDownload, '_blank').focus();
    };

    useEffect(() => {
        getDataDetail(id);
    }, []);

    useEffect(() => {
        console.log('data muthowif', dataMuthowif)
    }, [dataMuthowif])

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col md="6">
                    <span>Reservasi Id : {id}</span><br />
                    {statusBadge(dataDetail.status)}
                </Col>
                <Col md="6">
                    Booking Range : {dataDetail.startDate} - {dataDetail.endDate}
                </Col>
            </Row>
            {data.role === 1 ?
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Data Travel</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <span>Nama Travel</span>
                                        <h4 className="h4-custom">{dataTravel.travelName ? dataTravel.travelName : '-'}</h4>

                                    </Col>
                                    <Col>
                                        <span>Email</span>
                                        <h4 className="h4-custom">{dataTravel.email ? dataTravel.email : '-'}</h4>

                                    </Col>
                                    <Col>
                                        <span>No Telepon</span>
                                        <h4 className="h4-custom">{dataTravel.phone ? dataTravel.phone : '-'}</h4>

                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                : ''}
            <Row>
                <Col md="6">
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Data Muthowif</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span>Nama Muhthowif</span>
                                    <h4 className="h4-custom">{dataDetail.muthowifName ? dataDetail.muthowifName : '-'}</h4>
                                </Col>
                                <Col>
                                    <span>No Hp</span>
                                    <h4 className="h4-custom">{dataMuthowif && dataMuthowif.phone ? dataMuthowif.phone : '-'}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Email</span>
                                    <h4 className="h4-custom">{dataMuthowif && dataMuthowif.email ? dataMuthowif.email : '-'}</h4>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Data Penerbangan</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span>Kode Penerbangan</span>
                                    <h4 className="h4-custom">{dataDetail.flightCode ? dataDetail.flightCode : '-'}</h4>
                                </Col>
                                <Col>
                                    <span>Maskapai</span>
                                    <h4 className="h4-custom">{dataDetail.airline ? dataDetail.airline : '-'}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Jam Keberangkatan</span>
                                    <h4 className="h4-custom">{dataDetail.arrived ? dataDetail.arrived : '-'}</h4>
                                </Col>
                                <Col>
                                    <span>Jam Tiba</span>
                                    <h4 className="h4-custom">{dataDetail.departured ? dataDetail.departured : '-'}</h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Jadwal Perjalanan / Itenary</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col style={{ textAlign: 'center', margin: '0 auto' }}>
                                    {/* {`${process.env.REACT_APP_BACKEND_API}/files/itenary/${dataDetail.pdfItenaryUrl}`}
                                    <Document
                                        file={`${process.env.REACT_APP_BACKEND_API}/files/itenary/${dataDetail.pdfItenaryUrl}`}
                                        onLoadSuccess={() => onDocumentLoadSuccess()}
                                    >
                                        <Page pageNumber={pageNumber} />
                                    </Document>
                                    <p>Page {pageNumber} of {numPages}</p>
                                    <div>
                                        <div>
                                            <button
                                                type="button"
                                                disabled={pageNumber <= 1}
                                                onClick={() => previousPage()}
                                            >
                                                Previous
                                            </button>
                                            <button
                                                type="button"
                                                disabled={pageNumber >= numPages}
                                                onClick={() => nextPage()}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div> */}
                                    <Button
                                        className="btn-fill pull-right"
                                        variant="primary"
                                        onClick={() => downloadItenary()}
                                    >
                                        Download Itenary
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">PIC Travel</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span>Nama PIC</span>
                                    <h4 className="h4-custom">{dataDetail.picName ? dataDetail.picName : '-'}</h4>
                                </Col>
                                <Col>
                                    <span>No Hp</span>
                                    <h4 className="h4-custom">{dataDetail.picContact ? dataDetail.picContact : '-'}</h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Pembayaran</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span>Metode Pembayaran</span>
                                    <h4 className="h4-custom">{dataDetail.paymentMethod ? dataDetail.paymentMethod : '-'}</h4>
                                </Col>
                                <Col>
                                    <span>Nominal Pembayaran</span>
                                    <h4 className="h4-custom">{dataDetail.totalPayment ? dataDetail.totalPayment : '-'}</h4>
                                </Col>
                            </Row>
                            {data.role === 1 ?
                                <Form>
                                    <Row>
                                        <Col md="12">
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <span>Foto Bukti Pembayaran</span>
                                        </Col>
                                        <Col md="6">
                                            <Button
                                                className="btn-fill pull-right"
                                                variant="info"
                                                style={{ minWidth: '100%' }}
                                                disabled={loading || dataDetail && dataDetail.photoPaymentUrl ? false : true}
                                                onClick={() => handleUpdatePayment()}
                                            >
                                                {loading ? 'Tunggu Sebentar . . .' : 'Terima Pembayaran'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                :

                                <Row>
                                    <Col md="6">
                                        <span>Foto Bukti Pembayaran</span>
                                        {dataDetail && dataDetail.photoPaymentUrl ?
                                            <img src={`${baseUrl}/files/confirmPayment/${dataDetail && dataDetail.photoPaymentUrl}`} alt="Bukti Pembayaran" style={{ width: '100%' }} />
                                            : 'Belum Upload Bukti Pembayaran'}
                                        <Form.Control
                                            name="imagePayment"
                                            values=""
                                            onChange={(e) => handleChangeUpload(e)}
                                            type="file"
                                            disabled={dataDetail && dataDetail.photoPaymentUrl ? true : false}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Button
                                            className="btn-fill pull-right"
                                            variant="info"
                                            type="submit"
                                            style={{ minWidth: '100%' }}
                                            onClick={() => handleUploadPayment()}
                                            disabled={image === null ? true : false || loading || dataDetail && dataDetail.photoPaymentUrl ? true : false}
                                        >
                                            {loading ? 'Tunggu Sebentar . . .' : 'Konfirmasi Pembayaran'}
                                        </Button>
                                    </Col>
                                </Row>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ReservasiDetail;