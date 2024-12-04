import { Usuario } from "../models/Usuario.Model.js";

export const createUser = async (req, res) => {
  try {
    const user = await Usuario.createUser(req.body);
    res.status(201).json({
      message: "Usario Creado Ok",
      status: 201,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error crear usuario",
      status: 500,
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await Usuario.findAllActive();
    res.status(200).json({
      message: "Usuarios encontrados",
      status: 200,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar usuarios",
      status: 500,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findActiveById(id);

    res.status(200).json({
      message: "Usuario encontrado",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar usuarios",
      status: 500,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const userUpdated = await Usuario.update(id, data);
    res.status(200).json({
      message: "Usuario actualizado",
      status: 200,
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar usuario",
      status: 500,
      error,
    });
  }
};
