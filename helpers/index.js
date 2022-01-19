
const dbValidators = require('./db-validators');
const categoriaValidator = require('./categoria-validator');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');
const validators = require('./validators');


module.exports = {
    ...dbValidators,
    ...categoriaValidator,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
    ...validators,
}