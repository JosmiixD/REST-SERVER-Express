const { response, request } = require('express');

const usuariosGet = (req = request, res = response ) => {

    const { nombre = 'no name', id, apikey} = req.query;

    res.json({
        msg: 'Get Api - Controller',
        nombre,
        id,
        apikey
    })
}
const usuariosPost = (req, res = response ) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'Post Api - Controller',
        nombre,
        edad
    })
}
const usuariosPut = (req, res = response ) => {

    const { id } = req.params;

    res.json({
        msg: 'Put Api - Controller',
        id
    })
}
const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'Patch Api - Controller'
    })
}
const usuariosDelete = (req, res = response ) => {
    res.json({
        msg: 'Delete Api - Controller'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}