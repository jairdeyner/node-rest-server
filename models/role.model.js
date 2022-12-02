import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  rol: {
    type: String,
    require: [true, 'El rol es obligatorio'],
  },
});

export default model('Role', RoleSchema);
