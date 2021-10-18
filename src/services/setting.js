import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const getPrice = () => {
    return axios.get(baseUrl + '/setting/price')
        .then((response) => {
            const data = response && response.data && response.data.data;
            return data;
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const editPrice = (data) => {
    const bodyReq = {
        basePrice: data.basePrice,
        fee: data.fee,
        additionalCosts: data.additionalCosts,
    };

    return axios.patch(baseUrl + '/setting/price/', bodyReq)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch((response) => {
            return response;
        });
};

export {
    getPrice,
    editPrice
}