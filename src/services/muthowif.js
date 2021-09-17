import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const getListMuthowif = () => {
    return axios.get(baseUrl + '/muthowif')
        .then((response) => {
            const data = response && response.data && response.data.data;
            return data;
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const getListMuthowifAvailable = (startDate, endDate) => {
    const bodyReq = {
        startDate,
        endDate
    };

    return axios.post(baseUrl + '/muthowif/available', bodyReq)
        .then((response) => {
            const data = response && response.data && response.data.data;
            return data;
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const editMuthowif = (data, idMuthowif) => {
    const bodyReq = {
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
        address: data.address,
    }
    return axios.patch(baseUrl + '/muthowif/' + idMuthowif, bodyReq)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch((response) => {
            return response;
        });
};

const deleteMuthowif = (id) => {
    return axios.delete(baseUrl + '/muthowif/' + id)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch((response) => {
            return response;
        });
};

const getDetailMuthowif = (id) => {
    return axios.get(baseUrl + '/muthowif/' + id)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch((response) => {
            return response;
        });
};

export {
    getListMuthowif,
    getListMuthowifAvailable,
    editMuthowif,
    deleteMuthowif,
    getDetailMuthowif
}