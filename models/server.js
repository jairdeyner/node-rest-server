import express from 'express';
import cors from 'cors';

import { dbConnection } from '../db/config.db.js';

import userRoutes from '../routes/usuarios.route.js';
import authRoutes from '../routes/auth.route.js';
import categoryRoutes from '../routes/categorias.route.js';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categorias: '/api/categorias',
      usuarios: '/api/usuarios',
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.categorias, categoryRoutes);
    this.app.use(this.paths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('App ejecutandose en el puerto ' + this.port);
    });
  }
}
