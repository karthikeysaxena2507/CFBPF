import axios from "axios";
const data = require("../util/data");

const backendUrl = data.BACKEND_URL;
const hashKey = data.HASH_KEY;

const getLenders = async(data) => {
    const response = await axios.post(
        backendUrl + `/lenderRates?key=&hashKey=${hashKey}`, 
        data
    );
    return response.data;
}

const getPreLendersFromCache = async(key) => {
    const response = await axios.get(
        backendUrl + `/lenderRates/redis?hashKey=${hashKey}&key=${key}`);
    return response.data;
}

const getExtendedLendersFromCache = async(key) => {
    const response = await axios.get(
        backendUrl + `/lenderRates/extended/redis?hashKey=${hashKey}&key=${key}`);
    return response.data;
}

export {
    getLenders,
    getPreLendersFromCache,
    getExtendedLendersFromCache
}