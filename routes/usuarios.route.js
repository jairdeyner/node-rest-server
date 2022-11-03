import { Router } from 'express';

import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

export default router;
