import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const getListTravel = () => {
    return axios.get(baseUrl + '/travel')
        .then((response) => {
            const data = response && response.data && response.data.data;
            return data;
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const editTravel = (data, idTravel) => {
    const bodyReq = {
        travelName: data.travelName,
        email: data.email,
        phone: data.phone,
        address: data.address,
    }
    return axios.patch(baseUrl + '/travel/' + idTravel, bodyReq)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const deleteTravel = (id) => {
    return axios.delete(baseUrl + '/travel/' + id)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch((response) => {
            return response;
        });
};

const getDetailTravel = (id) => {
    return axios.get(baseUrl + '/travel/' + id)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch((response) => {
            return response;
        });
}

export {
    getListTravel,
    editTravel,
    deleteTravel,
    getDetailTravel
}