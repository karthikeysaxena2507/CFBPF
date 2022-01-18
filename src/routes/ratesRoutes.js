import axios from "axios";
const data = require("../util/data");

const backendUrl = data.BACKEND_URL;
const hashKey = data.HASH_KEY;

const getRates = async(data, key) => {
    const response = await axios.post(backendUrl + `/rates?hashKey=${hashKey}&key=${key}`, data);
    return response.data;
}

const getRatesFromCache = async(key) => {
    const response = await axios.get(backendUrl + `/rates/redis?hashKey=${hashKey}&key=${key}`)
    return response.data;
}

export {
    getRates,
    getRatesFromCache
}