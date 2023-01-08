import { Router } from 'express';
import { check } from 'express-validator';

import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} from '../controllers/productos.controller.js';

import { validarCampos, validarJWT } from '../middlewares/index.js';

import { existeCategoriaPorId } from '../helpers/db-validators.js';

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', obtenerProducto);

router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser numérico').isNumeric(),
    check('categoria', 'ID Categoría inválida').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

router.put('/:id', actualizarProducto);

router.delete('/:id', borrarProducto);

export default router;
