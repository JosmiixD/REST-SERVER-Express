
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos')
const { isValidRole, emailIsTaken, userExistsById } = require('../helpers/db-validators');

const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password no es lo suficientemente seguro').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailIsTaken ),
    check('rol').custom( isValidRole ),
    validarCampos
] ,usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userExistsById ),
    check('rol').custom( isValidRole ),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userExistsById ),
    validarCampos
], usuariosDelete);


module.exports = router;