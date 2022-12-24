import { response } from 'express';

import { Categoria } from '../models/index.js';

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.status(200).json({
    categorias,
    total,
  });
};

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  if (!categoria.estado) {
    return res.status(401).json({
      msg: 'Categoría eliminada comuniquese con el administrador',
    });
  }

  res.status(200).json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${nombre} ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizar categoria
const actualizarCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const { id } = req.params;
  const usuario = req.usuario._id;

  const categoriaBD = await Categoria.findOne({ nombre });

  if (categoriaBD) {
    return res.status(400).json({
      msg: `La categoria ${nombre} ya existe`,
    });
  }

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { nombre, usuario },
    { new: true }
  );

  res.status(200).json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(categoria);
};

export {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
