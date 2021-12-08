const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async ( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        //Verify if emails exists
        const usuario = await Usuario.findOne({correo});
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrectos - Email'
            });
        }

        //Verify if user is active
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrectos - Estado: False'
            });
        }
        //Verify password
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrectos - Password'
            });
        }
        //Generate JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Algo salio mal, contacte con el administrador'
        });
    }

}

module.exports = {
    login
}