import axios from "axios";
const data = require("../util/data");

const backendUrl = data.BACKEND_URL + "/illion";
const hashKey = data.HASH_KEY;

const getUpdatedLenders = async(body, key) => {
    const response = await axios.post(backendUrl + `?hashKey=${hashKey}&key=${key}`, body);
    return response.data;
}

export {
    getUpdatedLenders
}