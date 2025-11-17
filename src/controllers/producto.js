import repository from "../repositories/producto.js";

const findAll = (req, res) => {
    const  respuesta = repository.findAll();

    return sendResults(respuesta, res, "No se han encontrado registros.");
}

const findOne = (req, res) => {
    const id = req.params.id;
    const result = repository.findOne(id);

    return sendResults(result, res, "No se ha encontrado el registro.");
}

const create = (req, res) => {
    const object = req.body;

    const createdObj = repository.create(object);

    return sendResults(createdObj, res, "Error al crear el objeto.");
}

const update = (req, res) => {
    const object = req.body;
    const updatedObj = repository.update(object);

    return sendResults(updatedObj, res, "Error al actualizar el objeto.");
}

const remove = (req, res) => {
    const id = req.params.id;
    const result = repository.remove(id);

    return sendResults(result, res, "Error al eliminar el objeto.");
}

const sendResults = (resultado, res, message) => {
    if (resultado) {
        return res.status(200).json(resultado);
    } else {
        return res.status(500).json({ message });
    }
}

const controller = { findAll, findOne, create, update, remove };

export default controller;