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
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from 'yup';
import swal from "sweetalert";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import FlatPickr from "react-flatpickr";
import CardMuthowif from "components/CardMuthowif/CardMuthowif";
import { createReservation, getLastReservation } from "services/reservation";
import { getListMuthowifAvailable } from "services/muthowif";
import { getPrice } from "services/setting";

const Reservasi = () => {
    const [listMuthowif, setListMuthowif] = useState([]);
    const [loading, setLoading] = useState(false);

    const [dateRequired, setDateRequired] = useState(false);
    const [searchRequired, setSearchRequired] = useState(false);

    const [loadingReservartion, setLoadingReservation] = useState(false);

    const [dataDetail, setDataDetail] = useState({});
    const [dataBook, setDataBook] = useState({});
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalBook, setShowModalBook] = useState(false);

    const [dateRange, setDateRange] = useState([]);
    const [route, setRoute] = useState(0);
    const [emailMuthowif, setEmailMuthowif] = useState();
    const [emailTravel, setEmailTravel] = useState();
    const [muthowifId, setMuthowifId] = useState(0);

    const [muthowifName, setMuthowifName] = useState();
    const [travelName, setTravelName] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [totalDay, setTotalDay] = useState();
    const [totalPayment, setTotalPayment] = useState();
    const [image, setImage] = useState(null);
    const [lastId, setLastId] = useState();

    const [valueForm, setValueForm] = useState({});


    const [price, setPrice] = useState(0);

    const checkPrice = async () => {
        const res = await getPrice();
        const data = res[0];
        const basePrice = data && data.basePrice;
        const fee = data && data.fee;
        const additionalCosts = data && data.additionalCosts;
        const price = +basePrice + +fee + +additionalCosts;
        setPrice(price);
    };

    const getMuthowif = async () => {
        setLoading(true)
        const res = await getListMuthowifAvailable(startDate, endDate);
        if (res) {
            setListMuthowif(res);
            setLoading(false);
        } else {
            swal("Error !", '', "error").then(() => {
                console.log(res);
            });
            setLoading(false)
        }
    };

    const handleReservation = async () => {
        const res = await createReservation(valueForm, image, lastId);
        if (res && res.status === 201) {
            const messages = res && res.data && res.data.messages;
            swal("Sukses", messages, "success").then(() => {
                setShowModalBook(false);
                setLoadingReservation(false);
                window.location.replace("/admin/reservasi-list");
            });
        } else {
            swal("Error", 'Error', "error").then(() => {
                setShowModalBook(false);
                setLoadingReservation(false);
            });
        }
    };


    const getLastId = async () => {
        const res = await getLastReservation();
        console.log('res', res)
        const data = res && res.data && res.data.data && res.data.data[0] && res.data.data[0].id
        console.log('last id data', data)
        const id = +data + 1;
        console.log('last id', id)
        setLastId(id);
    };

    const onClickDetail = (data) => {
        setDataDetail(data);
        setShowModalDetail(true);
    };

    const onClickBook = (data) => {
        setMuthowifName(data.firstName, ' ', data.lastName);
        setMuthowifId(data.id);
        setEmailMuthowif(data.email);
        setDataBook(data);
        setShowModalBook(true);
    };

    const scheme = Yup.object().shape({
        airline: Yup.string()
            .required('Harap di isi !'),
        flightCode: Yup.string()
            .required('Harap di isi !'),
        departured: Yup.string()
            .required('Harap di isi !'),
        arrived: Yup.string()
            .required('Harap di isi !'),
        picName: Yup.string()
            .required('Harap di isi !'),
        picContact: Yup.string()
            .required('Harap di isi !'),
        paymentMethod: Yup.string()
            .required('Harap di isi !'),
        jmlJamaah: Yup.number()
            .max(35, "Maks 35 jamaah untuk 1 Reservasi")
            .required('Harap di isi !'),
    });

    const handleSelect = (e) => {
        if (e) {
            setRoute(e.target.value)
        };
    };

    const handleChangePdf = (e) => {
        setImage(e.target.files[0]);
    };

    const optionsFlatpickr = {
        mode: 'range',
        minDate: 'today',
        dateFormat: 'd-m-Y',
        onClose: function (selectedDates, dateStr, instance) {
            const daysInRange = document.getElementsByClassName('inRange');
            const daysLengthTotal = daysInRange.length + 1;
            if (daysLengthTotal === 1) {
                setTotalDay(1)
            } else {
                setTotalDay(daysLengthTotal + 1)
            }
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: scheme,
        initialValues: {
            startDate,
            endDate,
            muthowifName,
            travelName,
            airline: '',
            flightCode: '',
            departured: '',
            arrived: '',
            picName: '',
            picContact: '',
            paymentMethod: '',
            jmlJamaah: 0,
            emailTravel,
            emailMuthowif,
            route,
            muthowifId,
            totalDay,
            totalPayment,
        },
        onSubmit: (values) => {
            getLastId();
            setValueForm(values)
            setLoadingReservation(true);
        },
    });

    useEffect(() => {
        if (totalDay) {
            const totalPay = totalDay * 250;
            setTotalPayment(totalPay)
        }
    }, [totalDay]);

    useEffect(() => {
        if (dateRange.length > 0) {
            setDateRequired(false);
            const startDate = moment(dateRange[0]).format('YYYY-MM-DD');
            const endDate = moment(dateRange[1]).format('YYYY-MM-DD');
            setStartDate(startDate);
            setEndDate(endDate);
        } else {
            setDateRequired(true)
        };
    }, [dateRange]);

    useEffect(() => {
        if (route === 0) {
            setSearchRequired(true)
        } else {
            setSearchRequired(false)
        }
        console.log('route', route)
    }, [route]);

    useEffect(() => {
        const dataTravel = JSON.parse(localStorage.getItem('dataUser'));
        const email = dataTravel && dataTravel.email;
        const travelName = dataTravel && dataTravel.travelName;
        setEmailTravel(email);
        setTravelName(travelName);
    }, [])

    useEffect(() => {
        if (lastId !== undefined) {
            handleReservation();
        }
    }, [lastId])

    useEffect(() => {
        checkPrice();
    }, []);

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
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <Form.Label>Date Range</Form.Label>
                                                <FlatPickr
                                                    options={optionsFlatpickr}
                                                    value={dateRange}
                                                    placeholder="Pilih Rentang Tanggal"
                                                    className={"form-control-flatpickr"}
                                                    onChange={(e) => setDateRange(e)}
                                                />
                                                {dateRequired ? <Form.Text className="text-danger">Harap di pilih</Form.Text> : null}
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Route
                                                </label>
                                                <Form.Control
                                                    as="select"
                                                    name="routeSelect"
                                                    id="routeSelect"
                                                    isInvalid={searchRequired}
                                                    onChange={(e) => handleSelect(e)}
                                                >
                                                    <option value="0" onClick={() => setRoute(0)}>Pilih Route</option>
                                                    <option value="1" onClick={() => setRoute(1)}>Jeddah - Jeddah</option>
                                                    <option value="2" onClick={() => setRoute(2)}>Jeddah - Mecca</option>
                                                </Form.Control>
                                                {searchRequired ? <Form.Text className="text-danger">Harap di pilih</Form.Text> : null}

                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        style={{ minWidth: 150 }}
                                        variant="info"
                                        onClick={() => getMuthowif()}
                                        disabled={loading || searchRequired}
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
                        {loading ?
                            <>
                                <Skeleton count={2} height={100} />
                            </>
                            :
                            listMuthowif.map((data, index) => (
                                <>
                                    <CardMuthowif
                                        name={data.firstName}
                                        data={data}
                                        price={price}
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
                        <Form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col className="pr-1">
                                    <Form.Group>
                                        <label>Start Date</label>
                                        <Form.Control
                                            name="startDate"
                                            value={formik.values.startDate}
                                            disabled
                                            value={startDate}
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="pl-1">
                                    <Form.Group>
                                        <label>End Date</label>
                                        <Form.Control
                                            name="endDate"
                                            value={formik.values.endDate}
                                            disabled
                                            value={endDate}
                                            type="text"
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
                                            defaultValue={muthowifName}
                                            name="muthowifName"
                                            value={formik.values.muthowifName}
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>Jumlah Jamaah</label>
                                        <Form.Control
                                            name="jmlJamaah"
                                            value={formik.values.jmlJamaah}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="number"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.jmlJamaah && formik.errors.jmlJamaah}
                                        />
                                        {formik.touched.jmlJamaah && formik.errors.jmlJamaah ? (
                                            <Form.Text className="text-danger">{formik.errors.jmlJamaah}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>Maskapai</label>
                                        <Form.Control
                                            name="airline"
                                            value={formik.values.airline}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.airline && formik.errors.airline}
                                        />
                                        {formik.touched.airline && formik.errors.airline ? (
                                            <Form.Text className="text-danger">{formik.errors.airline}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                                <Col className="pl-1" md="4">
                                    <Form.Group>
                                        <label>Kode Penerbangan</label>
                                        <Form.Control
                                            name="flightCode"
                                            value={formik.values.flightCode}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.flightCode && formik.errors.flightCode}
                                        />
                                        {formik.touched.flightCode && formik.errors.flightCode ? (
                                            <Form.Text className="text-danger">{formik.errors.flightCode}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>Jam Keberangkatan</label>
                                        <Form.Control
                                            name="departured"
                                            value={formik.values.departured}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.departured && formik.errors.departured}
                                        />
                                        {formik.touched.departured && formik.errors.departured ? (
                                            <Form.Text className="text-danger">{formik.errors.flightCode}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <Form.Group>
                                        <label>Jam Kepulangan</label>
                                        <Form.Control
                                            name="arrived"
                                            values={formik.values.arrived}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.arrived && formik.errors.arrived}
                                        />
                                        {formik.touched.arrived && formik.errors.arrived ? (
                                            <Form.Text className="text-danger">{formik.errors.flightCode}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1">
                                    <Form.Group>
                                        <label>Nama PIC</label>
                                        <Form.Control
                                            name="picName"
                                            values={formik.values.picName}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.picName && formik.errors.picName}
                                        />
                                        {formik.touched.picName && formik.errors.picName ? (
                                            <Form.Text className="text-danger">{formik.errors.flightCode}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                                <Col className="pl-1">
                                    <Form.Group>
                                        <label>PIC / Kontak Travel Agent</label>
                                        <Form.Control
                                            name="picContact"
                                            values={formik.values.picContact}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.picContact && formik.errors.picContact}
                                        />
                                        {formik.touched.picContact && formik.errors.flightCode ? (
                                            <Form.Text className="text-danger">{formik.errors.flightCode}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="py-1">
                                    <Form.Group>
                                        <label>Metode Pembayaran</label>
                                        <Form.Control
                                            name="paymentMethod"
                                            values={formik.values.paymentMethod}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                        />
                                        {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                                            <Form.Text className="text-danger">{formik.errors.flightCode}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="py-1">
                                    <Form.Group>
                                        <label>Itenary / Jadwal Perjalanan</label>
                                        <Form.Control
                                            values=""
                                            onChange={(e) => handleChangePdf(e)}
                                            onKeyUp={formik.handleBlur}
                                            name="pdfitenary"
                                            id="pdfitenary"
                                            type="file"
                                            disabled={loadingReservartion}
                                            isInvalid={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                        />
                                        {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                                            <Form.Text className="text-danger">{formik.errors.flightCode}</Form.Text>)
                                            : null
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ display: 'none' }}>
                                <Col className="py-1">
                                    <Form.Group>
                                        <Form.Control
                                            name="route"
                                            values={formik.values.route}
                                            onChange={formik.handleChange}
                                            onKeyUp={formik.handleBlur}
                                            type="text"
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex align-items-center justify-content-between">
                                <Button
                                    className="btn-fill pull-right"
                                    variant="warning"
                                    onClick={() => setShowModalBook(false)}
                                    style={{ minWidth: 150 }}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className="btn-fill pull-right"
                                    type="submit"
                                    variant="info"
                                    style={{ minWidth: 150 }}
                                >
                                    {loadingReservartion ? <Spinner animation="border" variant="secondary" style={{ fonstSize: 10, height: 20, width: 20 }} size="sm" /> : 'Pesan Sekarang'}
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
