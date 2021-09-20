import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;
const dataTravel = JSON.parse(localStorage.getItem('dataUser'));
const travelId = dataTravel && dataTravel.id;

const createReservation = (values) => {

    return axios.post(baseUrl + '/reservation', {
        startDate: values && values.startDate,
        endDate: values && values.endDate,
        airline: values && values.airline,
        flightCode: values && values.flightCode,
        departured: values && values.departured,
        arrived: values && values.arrived,
        picName: values && values.picName,
        picContact: values && values.picContact,
        route: values && values.route,
        paymentMethod: values && values.paymentMethod,
        muthowifId: values && values.muthowifId,
        muthowifName: values && values.muthowifName,
        travelName: values && values.travelName,
        jmlJamaah: values && values.jmlJamaah,
        emailTravel: values && values.emailTravel,
        emailMuthowif: values && values.emailMuthowif,
        travelId: travelId,
        totalDay: values && values.totalDay,
        totalPayment: values && values.totalPayment,
        status: 1
    })
        .then((response) => {
            return { ...response };
        })
        .catch(function (error) {
            console.log('error', error);
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
    return axios.get(baseUrl +  `/travelReservation/detail/${id}`)
    .then((response) => {
        return { ...response };
    })
    .catch(function (error) {
        console.log('error', error);
    });
};

export {
    createReservation,
    getReservationList,
    getReservationDetail,
    getReservationListbyTravel
};