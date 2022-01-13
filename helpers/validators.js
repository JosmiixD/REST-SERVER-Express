const { Producto } = require("../models")

const productExistsById = async ( id = '' ) => {

    const productExists = await Producto.findById(id);

    if( !productExists || !productExists.estado ) {
        throw new Error('No existe el producto con el id proporcionado');
    }
}


module.exports = {
    productExistsById
}
