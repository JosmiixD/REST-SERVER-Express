const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isValidRole = async (rol = '' ) => {
    const existeRole = await Role.findOne({ rol });
    if( !existeRole ) {
        throw new Error(`El rol ${rol} no esta registrao en la BD`)
    }
}

const emailIsTaken = async( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error('El correo ya se encuentra registrado');
    }

}

const userExistsById = async( id ) => {
    const userExists = await Usuario.findById( id );
    if( !userExists ) {
        throw new Error('No existe usuario con el id proporcionado');
    }
}


module.exports = {
    isValidRole,
    emailIsTaken,
    userExistsById
}