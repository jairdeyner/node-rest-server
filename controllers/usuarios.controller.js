import { response } from 'express';

const usuariosGet = (req, res = response) => {
  const query = req.query;

  res.json({ msg: 'get API - controlador', query });
};

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.status(201).json({ msg: 'post API - controlador', nombre, edad });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;

  res.status(400).json({ msg: 'put API - controlador', id });
};

const usuariosPatch = (req, res = response) => {
  res.json({ msg: 'patch API - controlador' });
};

const usuariosDelete = (req, res = response) => {
  res.json({ msg: 'delete API - controlador' });
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
