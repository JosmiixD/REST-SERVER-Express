const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, actualizarProducto, obtenerProducto, borrarProducto } = require('../controllers/productos');
const { categoryExistsById } = require('../helpers/categoria-validator');
const { productExistsById } = require('../helpers/validators');

const { validarJWT, esAdminRole, tieneRole, validarCampos } = require('../middlewares');

const router = Router();


router.get('/', obtenerProductos );

router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( productExistsById ),
    validarCampos
], obtenerProducto );

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('categoria', 'La categoria no es valida').isMongoId(),
    check('categoria').custom( categoryExistsById ),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( productExistsById ),
    validarCampos
], actualizarProducto);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( productExistsById ),
    validarCampos
], borrarProducto );


module.exports = router;