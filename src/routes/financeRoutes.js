import axios from "axios";
const data = require("../util/data");

const backendUrl = data.BACKEND_URL + "/finances";
const hashKey = data.HASH_KEY;

const getFinanceFromCache = async(key) => {
    const response = await axios.get(backendUrl + `/redis?hashKey=${hashKey}&key=${key}`);
    return response.data;
}

export {
    getFinanceFromCache
}