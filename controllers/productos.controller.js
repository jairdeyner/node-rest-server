import { response } from 'express';

import { Producto } from '../models/index.js';

const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.params;

  const query = { estado: true };

  const productos = await Producto.find(query)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre')
    .skip(Number(desde))
    .limit(Number(limite));

  res.json(productos);
};
const obtenerProducto = (req, res = response) => {
  res.json({
    msg: 'get -  id',
  });
};
const crearProducto = async (req, res = response) => {
  const { nombre, precio, categoria, descripcion = '' } = req.body;

  const usuario = req.usuario._id;

  const productoDB = await Producto.findOne({ nombre: nombre.toUpperCase() });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${nombre} ya existe`,
    });
  }

  const data = {
    nombre: nombre.toUpperCase(),
    precio,
    categoria,
    descripcion,
    usuario,
  };

  const producto = new Producto(data);

  await producto.save();

  res.json(producto);
};
const actualizarProducto = (req, res = response) => {
  res.json({
    msg: 'put',
  });
};
const borrarProducto = (req, res = response) => {
  res.json({
    msg: 'delete',
  });
};

export {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
