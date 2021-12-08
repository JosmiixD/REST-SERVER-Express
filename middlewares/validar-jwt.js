const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validartJWT = async ( req = request , res = response,next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'Es necesario el token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario eliminado en DB'
            });
        }

        //Verificar si el usuario tiene estado true
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario eliminado'
            });
        }
        
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Tolken no valido'
        });
    }


}

module.exports = {
    validartJWT
}