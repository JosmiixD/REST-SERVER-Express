const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('correo', 'El correo no cumple con el formato example@example.com').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token', 'El token de Google es necesario').notEmpty(),
    validarCampos
],googleSignIn);


module.exports = router;