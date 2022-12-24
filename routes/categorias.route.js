import { Router } from 'express';
import { check } from 'express-validator';

import {
  actualizarCategoria,
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  borrarCategoria,
} from '../controllers/categorias.controller.js';

import { validarCampos, validarJWT, tieneRole } from '../middlewares/index.js';

import { existeCategoriaPorId } from '../helpers/db-validators.js';

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
  '/:id',
  [
    check('id', 'ID inválido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar categoria - privado - cualquier persona con un token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'ID inválido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar categoria - ADMIN
router.delete(
  '/:id',
  [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'ID inválido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

export default router;
