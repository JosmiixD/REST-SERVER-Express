const { request, response } = require('express');
const {Producto} = require('../models');


//obtenerProductos
const obtenerProductos = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.body;

    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number(desde) )
            .limit( Number( limite ))
    ]);

    res.json({
        total,
        productos
    });

}

//Obtener producto 


const obtenerProducto = async( req, res = response ) => {

    const {id} = req.params;

    const producto = await Producto.findById( id )
                        .populate('usuario', 'nombre')
                        .populate('categoria', 'nombre');
    
    res.status(200).json( producto );

}

//Crear Producto

const crearProducto = async( req, res = response ) => {

    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre: data.nombre });

    if( productoDB ) {
        res.status(400).json({
            msg: `El producto ${data.nombre} ya se encuentra registrado`
        });
    }

    data.usuario = req.usuario._id;

    const producto = new Producto( data );

    await producto.save();

    res.status(201).json( producto );
    

}


//Actualizar Producto 
const actualizarProducto = async ( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;


    const producto = await Producto.findByIdAndUpdate( id, data, {new: true})
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.status(200).json( producto );

}

//Eliminar producto
const borrarProducto = async( req, res = response ) => {
    
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        producto,
        usuarioAutenticado
    });

}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}
