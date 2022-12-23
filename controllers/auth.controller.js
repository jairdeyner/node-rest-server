import { json, response } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.model.js';

import { generarJWT } from '../helpers/generarJWT.js';
import { googleVerify } from '../helpers/google-verify.js';
import { DefaultTransporter } from 'google-auth-library';

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      });
    }

    // Si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false',
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(
      password.toString(),
      usuario.password
    );

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

const googleSingIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    const { nombre, img, correo } = googleUser;

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ':p',
        rol: 'USER_ROLE',
        img,
        google: true,
      };

      usuario = new Usuario(data);

      await usuario.save();
    }

    // Si el usuario en BDestado: false
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar',
    });
  }
};

export { login, googleSingIn };
