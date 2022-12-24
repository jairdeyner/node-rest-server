import Role from '../models/role.model.js';
import { Usuario, Categoria } from '../models/index.js';

const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id = 1) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

const existeCategoriaPorId = async (id = 1) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`La categoría con id ${id} no existe`);
  }
};

export {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
};
