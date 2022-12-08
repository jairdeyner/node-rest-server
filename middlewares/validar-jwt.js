import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import Usuario from '../models/usuario.model.js';

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const { uid } = payload;

    // Leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if(!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe DB',
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false',
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};

export { validarJWT };
