const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { categoryExistsById } = require('../helpers/categoria-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

//Obtener categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( categoryExistsById ),
    validarCampos
], obtenerCategoria );

//Crear categorias - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria );

//Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( categoryExistsById ),
    check('nombre', 'El nombre es necesario para la actualizacion').notEmpty(),
    validarCampos
], actualizarCategoria);

//Borrar una categoria - Admin 
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( categoryExistsById ),
    validarCampos
], borrarCategoria);

module.exports = router;