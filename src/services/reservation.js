import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;
const dataTravel = JSON.parse(localStorage.getItem('dataUser'));
const travelId = dataTravel && dataTravel.id;

const createReservation = (values, image, lastId) => {

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data; boundary=<calculated when request is sent>';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

    const data = new FormData();
    data.append("pdfitenary", image);
    data.append("startDate", values && values.startDate);
    data.append("endDate", values && values.endDate);
    data.append("airline", values && values.airline);
    data.append("flightCode", values && values.flightCode);
    data.append("departured", values && values.departured);
    data.append("arrived", values && values.arrived);
    data.append("picName", values && values.picName);
    data.append("picContact", values && values.picContact);
    data.append("route", values && values.route);
    data.append("paymentMethod", values && values.paymentMethod);
    data.append("muthowifId", values && values.muthowifId);
    data.append("muthowifName", values && values.muthowifName);
    data.append("travelName", values && values.travelName);
    data.append("jmlJamaah", values && values.jmlJamaah);
    data.append("emailTravel", values && values.emailTravel);
    data.append("emailMuthowif", values && values.emailMuthowif);
    data.append("travelId", travelId);
    data.append("totalDay", values && values.totalDay);
    data.append("totalPayment", values && values.totalPayment);
    data.append("lastId", lastId);
    data.append("status", 1);

    const config = {
        method: 'post',
        url: baseUrl + `/reservation`,
        data: data
    };

    return axios(config)
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
            return { ...error };
        });
};

const uploadPayment = (id, image) => {
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data; boundary=<calculated when request is sent>';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

    const data = new FormData();
    data.append("imagePayment", image);

    const config = {
        method: 'patch',
        url: baseUrl + `/reservation/${id}/upload-payment`,
        data: data
    };

    return axios(config)
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
            return { ...error };
        });
};

const getReservationList = () => {
    return axios.get(baseUrl + '/travelReservation/')
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const getLastReservation = () => {
    return axios.get(baseUrl + '/reservation/last')
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const getReservationListbyTravel = (id) => {
    return axios.get(baseUrl + '/travelReservation/travel/' + travelId)
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const getReservationDetail = (id) => {
    return axios.get(baseUrl + `/travelReservation/detail/${id}`)
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const updateReservation = (id, values) => {

    const bodyReq = {
        status: values && values.status
    };

    return axios.patch(baseUrl + `/reservation/${id}`, bodyReq)
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
        });
}

export {
    createReservation,
    getReservationList,
    getLastReservation,
    getReservationDetail,
    getReservationListbyTravel,
    uploadPayment,
    updateReservation
};