const { Categoria } = require("../models");

const categoryExistsById = async( id ) => {

    const categoryExists = await Categoria.findById( id );

    if( !categoryExists || !categoryExists.estado ) {
        throw new Error('No existe categoria con el id proporcionado');
    }
    
}



module.exports = {
    categoryExistsById
}