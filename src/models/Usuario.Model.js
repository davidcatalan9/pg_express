import { query } from "../config/db.config.js";
import { v4 as uuidv4 } from "uuid";

export class Usuario {
  constructor(name, lastname, email, phone, birthday, saldo) {
    this.id = uuidv4();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.birthday = birthday; // Corregido de 'birtday'
    this.saldo = saldo;
    this.active = true; // Corregido de 'actuve'
  }

  static async createUser(data) {
    try {
      const { name, lastname, email, phone, birthday, saldo } = data;
      console.log(data);
      const id = uuidv4();
      const active = true;

      const { rows } = await query(
        "INSERT INTO usuarios(id, name, lastname, email, phone, birthday, saldo, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [id, name, lastname, email, phone, birthday, saldo, active]
      );

      console.log(rows[0]);
      return rows[0]; // Retorna el resultado de la inserción
    } catch (error) {
      console.error("Error al crear usuario", error.message);
      throw new Error(`Error crear usuario: ${error.message}`);
    }
  }

  static async findAllActive() {
    try {
      const findQuery = "SELECT * FROM usuarios WHERE active = $1";
      const value = [true];

      const { rows } = await query(findQuery, value);
      return rows;
    } catch (error) {
      console.error(`Error al buscar usuarios. ERROR: ${error.message} `);
      throw new Error(`error busca usuarios ${error}`);
    }
  }

  static async findUserById(id) {
    try {
      const findQuery = "SELECT * FROM usuarios WHERE id = $1 AND active =$2";
      const value = [id, true];
      const { rows } = await query(findQuery, value);
      if (rows.length <= 0) throw new Error("Usuario no encontrado");
      return rows[0];
    } catch (error) {
      console.error(
        `error al buscar el id del usuario ERROR: ${error.message}`
      );
      throw new Error(`Error al buscar usuario por id ${error}`);
    }
  }

  static async updateUser(id, data) {
    try {
      const { name, lastname, email, phone, birthday, saldo } = data;
      const updateQuery =
        "UPDATE usuarios SET name = $1, lastname = $2, email = $3, phone = $4, birthday = $5, saldo = $6 WHERE id = $7 AND active = true RETURNING *";

      const values = [name, lastname, email, phone, birthday, saldo, id, true];

      const { rows } = await query(updateQuery, values);
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
    }
  }

  static async permaDelete(id) {
    try {
      const deleteQuery =
        "DELETE FROM usuarios WHERE id = $1 AND active = true";
      const value = [id];
      const { rows } = await query(deleteQuery, value);
    } catch (error) {
      console.error("error al eliminar usuario");
      throw new Error(`Error al eliminar usuario ${error}`);
    }
  }
}
