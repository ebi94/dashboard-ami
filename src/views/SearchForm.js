import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import FlatPickr from "react-flatpickr";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from 'yup';
import swal from "sweetalert";
import { getListMuthowifAvailable } from 'services/muthowif';


const SearchForm = props => {
    const { onData } = props;

    const [loading, setLoading] = useState(false);

    const [dateRange, setDateRange] = useState([]);
    const [route, setRoute] = useState(0);

    const handleSearch = async (values) => {
        const res = await getListMuthowifAvailable();
        if (res) {
            onData(res);
            setLoading(false);
        } else {
            setLoading(false);
            swal("Error !", "", "error");
        }
    };

    const optionsFlatpickr = {
        mode: 'range',
        minDate: 'today',
        dateFormat: 'd-m-Y'
    };

    const scheme = Yup.object().shape({
        dateRange: Yup.array()
            .required('Harap di isi !'),
        route: Yup.string()
            .required('Harap di isi !'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: scheme,
        initialValues: {
            dateRange,
            route,
        },
        onSubmit: (values) => {
            handleSearch(values);
            setLoading(true);
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col className="pr-1" md="6">
                    <Form.Group>
                        <Form.Label>Date Range</Form.Label>
                        <FlatPickr
                            options={optionsFlatpickr}
                            value={dateRange}
                            placeholder="Pilih Rentang Tanggal"
                            className="form-control-flatpickr"
                            onChange={(e) => setDateRange(e)}
                        />
                        {formik.touched.dateRange && formik.errors.dateRange ? (
                            <Form.Text className="text-danger">{formik.errors.dateRange}</Form.Text>)
                            : null
                        }
                    </Form.Group>
                </Col>
                <Col className="pl-1" md="6">
                    <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                            Route
                        </label>
                        <Form.Control
                            as="select"
                            name="route"
                            id="routeSelect"
                            onChange={(e) => setRoute(e.target.value)}
                            isInvalid={formik.touched.route && formik.errors.route}
                        >
                            <option>Pilih Route</option>
                            <option value="1">Jeddah - Jeddah</option>
                            <option value="2">Jeddah - Mecca</option>
                        </Form.Control>
                        {formik.touched.route && formik.errors.route ? (
                            <Form.Text className="text-danger">{formik.errors.route}</Form.Text>)
                            : null
                        }
                    </Form.Group>
                </Col>
            </Row>
            <Button
                className="btn-fill pull-right"
                style={{ minWidth: 150 }}
                variant="info"
                type="submit"
                disabled={loading}
            >
                {loading ? <Spinner animation="border" variant="secondary" style={{ fonstSize: 10, height: 20, width: 20 }} size="sm" /> : "Cari Muthowif"}
            </Button>
            <div className="clearfix"></div>
        </Form>
    );
};


SearchForm.propTypes = {
    onData: PropTypes.func.isRequired,
};

export default SearchForm;