import oProductos from '../models/producto.js'

let data = [...oProductos];
let counter = data.length;

const findAll = () => {
    return data;
}

const findOne = (id) => {
    const result = data.find(item => item.id === parseInt(id));

    return result;
}

const create = (payload) => {
    payload.id = ++counter;
    data.push(payload);
    return payload; 
}

const update = (payload) => {
    const index = data.findIndex(item => item.id === parseInt(payload.id));

    if (index > -1) {
        data[index] = payload;
        return payload;
    } else
        return null;
}

const remove = (id) => {
    const index = data.findIndex(item => item.id === parseInt(id));

    if (index > -1) {
        data.splice(index, 1);
        return true;
    } else
        return false;
}

const repository = { findAll, findOne, create, update, remove };

export default repository;